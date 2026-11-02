import Stripe from "stripe";

// This assignment MUST use fake-money Stripe test keys, never live keys.
const key = process.env.STRIPE_SECRET_KEY;
if (key && !key.startsWith("sk_test_")) {
  throw new Error("Assignment 4 requires a STRIPE_SECRET_KEY starting with sk_test_.");
}

export const stripe = key ? new Stripe(key) : null;

export function requireStripe(req, res, next) {
  if (!stripe) {
    return res.status(503).json({ error: "Stripe test checkout is not configured on this server." });
  }
  next();
}
