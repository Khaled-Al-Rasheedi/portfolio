import { Router } from "express";
import bcrypt from "bcryptjs";
import { rateLimit } from "express-rate-limit";
import { pool } from "../db.js";

const router = Router();
const authLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many attempts. Please try again later." },
});

function validEmail(email) {
  return typeof email === "string" &&
    email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function publicUser(row) {
  return { id: row.id, email: row.email };
}

// POST /api/auth/signup - { email, password }
router.post("/signup", authLimit, async (req, res) => {
  const email = typeof req.body?.email === "string"
    ? req.body.email.trim().toLowerCase()
    : "";
  const password = req.body?.password;
  if (!validEmail(email) || typeof password !== "string" ||
      password.length < 8 || password.length > 72) {
    return res.status(400).json({ error: "Enter a valid email and a password of 8–72 characters." });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const result = await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
      [email, passwordHash]
    );
    const user = publicUser(result.rows[0]);
    req.session = { userId: user.id };
    res.status(201).json({ user });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ error: "This email is already registered." });
    }
    console.error("POST /api/auth/signup:", error);
    res.status(500).json({ error: "Could not create account" });
  }
});

// POST /api/auth/login - { email, password }
router.post("/login", authLimit, async (req, res) => {
  const email = typeof req.body?.email === "string"
    ? req.body.email.trim().toLowerCase()
    : "";
  const password = req.body?.password;
  if (!validEmail(email) || typeof password !== "string") {
    return res.status(400).json({ error: "Invalid email or password." });
  }

  try {
    const result = await pool.query(
      "SELECT id, email, password_hash FROM users WHERE email = $1",
      [email]
    );
    const row = result.rows[0];
    if (!row || !(await bcrypt.compare(password, row.password_hash))) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    const user = publicUser(row);
    req.session = { userId: user.id };
    res.json({ user });
  } catch (error) {
    console.error("POST /api/auth/login:", error);
    res.status(500).json({ error: "Could not log in" });
  }
});

// GET /api/auth/me - uses signed session cookie, then checks PostgreSQL.
router.get("/me", async (req, res) => {
  const userId = req.session?.userId;
  if (!userId) return res.json({ user: null });

  try {
    const result = await pool.query(
      "SELECT id, email FROM users WHERE id = $1", [userId]
    );
    if (!result.rows[0]) {
      req.session = null;
      return res.json({ user: null });
    }
    res.json({ user: publicUser(result.rows[0]) });
  } catch (error) {
    console.error("GET /api/auth/me:", error);
    res.status(500).json({ error: "Could not check session" });
  }
});

// POST /api/auth/logout - removes browser cookie session.
router.post("/logout", (req, res) => {
  req.session = null;
  res.json({ ok: true });
});

export default router;
