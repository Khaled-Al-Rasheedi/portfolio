import "dotenv/config";
import express from "express";
import cookieSession from "cookie-session";
import { pool } from "./db.js";
import carsRouter from "./routes/cars.js";
import authRouter from "./routes/auth.js";
import servicesRouter from "./routes/services.js";
import checkoutRouter from "./routes/checkout.js";
import ordersRouter from "./routes/orders.js";
import { stripeWebhook } from "./routes/webhook.js";

if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
  throw new Error("SESSION_SECRET must contain at least 32 characters in server/.env");
}

const app = express();
const port = Number(process.env.PORT || 4000);
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.set("trust proxy", 1);

// CRITICAL: Stripe's signed webhook must receive the ORIGINAL body bytes.
// Put this BEFORE express.json(), cookies, and the browser origin guard.
app.post("/api/stripe/webhook", express.raw({ type: "application/json", limit: "128kb" }), stripeWebhook);

app.use(express.json({ limit: "10kb" }));

// Signed session: only the user ID goes in the browser cookie.
app.use(cookieSession({
  name: "porsche_session",
  keys: [process.env.SESSION_SECRET],
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
}));

// Browser CSRF/origin defense. Stripe's authenticated webhook is intentionally
// outside this guard; Stripe requests don't have your React website's Origin.
app.use((req, res, next) => {
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    const origin = req.get("origin");
    if (origin && origin !== clientOrigin) {
      return res.status(403).json({ error: "Unexpected request origin" });
    }
  }
  next();
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/cars", carsRouter);
app.use("/api/auth", authRouter);
app.use("/api/services", servicesRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orders", ordersRouter);
app.use((_req, res) => res.status(404).json({ error: "Route not found" }));

try {
  await pool.query("SELECT 1");
  app.listen(port, "0.0.0.0", () => {
    console.log(`Express API running at http://localhost:${port}`);
  });
} catch (error) {
  console.error("Database connection failed:", error.message);
  process.exitCode = 1;
  await pool.end();
}
