import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { pool } from "../db.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { stripe, requireStripe } from "../stripe.js";

const router = Router();
const checkoutLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 15,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many checkout attempts. Please try again later." },
});

// POST /api/checkout  { "serviceCode": "single_photo" }
// Client NEVER submits price, currency, order ID, or user ID.
router.post("/", checkoutLimit, requireAuth, requireStripe, async (req, res) => {
  const { serviceCode } = req.body || {};
  if (typeof serviceCode !== "string" || !/^[a-z_]{2,40}$/.test(serviceCode)) {
    return res.status(400).json({ error: "Choose a valid Porsche 911 package." });
  }

  let orderId;
  try {
    // Look up the SERVER's official price, regardless of anything shown in React.
    const serviceResult = await pool.query(
      `SELECT code, name, description, price_cents, currency
       FROM services WHERE code = $1 AND active = TRUE`,
      [serviceCode]
    );
    const service = serviceResult.rows[0];
    if (!service) return res.status(404).json({ error: "Package is not available." });

    // Order and price snapshot must be inserted together, atomically.
    const db = await pool.connect();
    try {
      await db.query("BEGIN");
      const order = await db.query(
        `INSERT INTO orders (user_id, status, currency, total_amount_cents)
         VALUES ($1, 'pending', $2, $3) RETURNING id`,
        [req.authUser.id, service.currency, service.price_cents]
      );
      orderId = order.rows[0].id.toString();
      await db.query(
        `INSERT INTO order_items
         (order_id, service_code, service_name, quantity, unit_price_cents)
         VALUES ($1, $2, $3, 1, $4)`,
        [orderId, service.code, service.name, service.price_cents]
      );
      await db.query("COMMIT");
    } catch (error) {
      await db.query("ROLLBACK");
      throw error;
    } finally {
      db.release();
    }

    const origin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        payment_method_types: ["card"],
        customer_email: req.authUser.email,
        client_reference_id: orderId,
        metadata: { order_id: orderId },
        line_items: [{
          price_data: {
            currency: service.currency,
            unit_amount: service.price_cents,
            product_data: {
              name: service.name,
              description: service.description,
            },
          },
          quantity: 1,
        }],
        success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/?checkout=cancel`,
      },
      { idempotencyKey: `porsche-911-order-${orderId}` }
    );

    if (!session.url) throw new Error("Stripe did not return a Checkout URL.");

    const linked = await pool.query(
      `UPDATE orders SET stripe_checkout_session_id = $1
       WHERE id = $2 AND status = 'pending' AND stripe_checkout_session_id IS NULL
       RETURNING id`,
      [session.id, orderId]
    );
    if (linked.rowCount !== 1) {
      // Do not expose a Checkout URL if we cannot identify its order in PostgreSQL.
      await stripe.checkout.sessions.expire(session.id).catch(() => {});
      throw new Error("Failed to link Stripe Checkout Session to order.");
    }

    res.status(201).json({ orderId, url: session.url });
  } catch (error) {
    console.error("POST /api/checkout:", error);
    // Failed checkouts are not paid. Only the webhook can set status='paid'.
    if (orderId) {
      await pool.query(
        "UPDATE orders SET status = 'failed' WHERE id = $1 AND status = 'pending'",
        [orderId]
      ).catch((dbError) => console.error("Could not mark checkout attempt failed:", dbError));
    }
    res.status(502).json({ error: "Could not start Stripe Checkout. Please try again." });
  }
});

export default router;
