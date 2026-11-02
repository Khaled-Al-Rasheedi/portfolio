import { pool } from "../db.js";
import { stripe } from "../stripe.js";

// POST /api/stripe/webhook: Express RAW body, BEFORE express.json().
// The browser and the success page can NEVER mark an order paid.
export async function stripeWebhook(req, res) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return res.status(503).send("Stripe test webhook is not configured.");
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.get("stripe-signature"),
      secret
    );
  } catch (error) {
    console.warn("Rejected Stripe webhook signature:", error.message);
    return res.status(400).send("Invalid Stripe signature");
  }

  const session = event.data.object;
  const orderId = session.metadata?.order_id;
  const isKnownOrder = typeof orderId === "string" && /^\d{1,18}$/.test(orderId);
  const matchesClientRef = session.client_reference_id === orderId;

  try {
    if (event.type === "checkout.session.completed" ||
        event.type === "checkout.session.async_payment_succeeded") {
      // For delayed payment methods, completed can mean payment still pending.
      if (session.payment_status !== "paid") return res.json({ received: true });
      if (!isKnownOrder || !matchesClientRef ||
          !Number.isSafeInteger(session.amount_total) ||
          session.amount_total < 1 || session.currency !== "sar") {
        console.error("Stripe webhook has invalid order reference or amount:", event.id);
        return res.status(422).send("Invalid order details");
      }

      // Idempotent: retries cannot double-pay. Amount, currency and session ID
      // MUST match the order originally created using database-backed prices.
      const result = await pool.query(
        `UPDATE orders SET
           status = 'paid', paid_at = COALESCE(paid_at, NOW()),
           stripe_payment_intent_id = COALESCE(stripe_payment_intent_id, $5)
         WHERE id = $1 AND stripe_checkout_session_id = $2
           AND total_amount_cents = $3 AND currency = $4
           AND status = 'pending'
         RETURNING id`,
        [
          orderId,
          session.id,
          session.amount_total,
          session.currency,
          typeof session.payment_intent === "string" ? session.payment_intent : null,
        ]
      );
      if (result.rowCount === 0) {
        const existing = await pool.query(
          `SELECT status FROM orders WHERE id = $1
           AND stripe_checkout_session_id = $2
           AND total_amount_cents = $3 AND currency = $4`,
          [orderId, session.id, session.amount_total, session.currency]
        );
        if (existing.rows[0]?.status !== "paid") {
          console.error("Webhook order mismatch; will retry:", event.id);
          return res.status(409).send("Order mismatch");
        }
      }
    } else if (
      event.type === "checkout.session.expired" ||
      event.type === "checkout.session.async_payment_failed"
    ) {
      if (isKnownOrder && matchesClientRef) {
        await pool.query(
          `UPDATE orders SET status = $3
           WHERE id = $1 AND stripe_checkout_session_id = $2 AND status = 'pending'`,
          [
            orderId,
            session.id,
            event.type === "checkout.session.expired" ? "canceled" : "failed",
          ]
        );
      }
    }
    // Return 2xx for delivered / already-handled events (Stripe may retry).
    res.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing failed:", error);
    res.status(500).send("Webhook processing failed");
  }
}
