import { pool } from "../db.js";

// The signed cookie gives us a user ID; verify it still exists in PostgreSQL.
export async function requireAuth(req, res, next) {
  const userId = req.session?.userId;
  if (!Number.isSafeInteger(userId) || userId < 1) {
    return res.status(401).json({ error: "Sign in before ordering a Porsche 911 shoot." });
  }
  try {
    const result = await pool.query(
      "SELECT id, email FROM users WHERE id = $1",
      [userId]
    );
    if (!result.rows[0]) {
      req.session = null;
      return res.status(401).json({ error: "Your session has expired. Please sign in again." });
    }
    req.authUser = result.rows[0];
    next();
  } catch (error) {
    console.error("Checkout authentication check failed:", error);
    res.status(500).json({ error: "Could not verify your account." });
  }
}
