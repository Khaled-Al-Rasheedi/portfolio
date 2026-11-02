import { Router } from "express";
import { pool } from "../db.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();
router.use(requireAuth);

async function sendOrder(req, res, query, params) {
  try {
    // user_id in the WHERE clause prevents viewing another user's orders.
    const result = await pool.query(query, params);
    const order = result.rows[0];
    if (!order) return res.status(404).json({ error: "Order not found." });
    const items = await pool.query(
      `SELECT service_code, service_name, quantity, unit_price_cents
       FROM order_items WHERE order_id = $1 ORDER BY id`,
      [order.id]
    );
    res.json({ order: { ...order, items: items.rows } });
  } catch (error) {
    console.error("GET /api/orders:", error);
    res.status(500).json({ error: "Could not retrieve order." });
  }
}

const fields = `SELECT id, status, currency, total_amount_cents,
  stripe_checkout_session_id, created_at, paid_at FROM orders`;

// Used by the success page to poll until the verified webhook marks it paid.
router.get("/by-session/:sessionId", async (req, res) => {
  const { sessionId } = req.params;
  if (!/^cs_[A-Za-z0-9_]{10,160}$/.test(sessionId)) {
    return res.status(400).json({ error: "Invalid Checkout Session ID." });
  }
  await sendOrder(req, res,
    `${fields} WHERE stripe_checkout_session_id = $1 AND user_id = $2`,
    [sessionId, req.authUser.id]);
});

router.get("/:id", async (req, res) => {
  const orderId = req.params.id;
  if (!/^\d{1,18}$/.test(orderId) || orderId === "0") {
    return res.status(400).json({ error: "Invalid order ID." });
  }
  await sendOrder(req, res,
    `${fields} WHERE id = $1 AND user_id = $2`,
    [orderId, req.authUser.id]);
});

export default router;
