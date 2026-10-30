import "dotenv/config";
import express from "express";
import cookieSession from "cookie-session";
import { pool } from "./db.js";
import carsRouter from "./routes/cars.js";
import authRouter from "./routes/auth.js";

if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
  throw new Error("SESSION_SECRET must contain at least 32 characters in server/.env");
}

const app = express();
const port = Number(process.env.PORT || 4000);
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

// Needed when Express runs behind a trusted hosting proxy (Railway, etc.).
app.set("trust proxy", 1);
app.use(express.json({ limit: "10kb" }));

// Only two database tables are needed: signed sessions live in browser cookies.
// The browser can read a signed cookie, so ONLY place the user ID inside it.
app.use(cookieSession({
  name: "porsche_session",
  keys: [process.env.SESSION_SECRET],
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
}));

// Simple origin guard for requests that can modify data (CSRF defense-in-depth).
app.use((req, res, next) => {
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    const origin = req.get("origin");
    if (origin && origin !== clientOrigin) {
      return res.status(403).json({ error: "Unexpected request origin" });
    }
  }
  next();
});

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/cars", carsRouter);
app.use("/api/auth", authRouter);
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

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
