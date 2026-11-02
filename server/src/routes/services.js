import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// The frontend displays THESE database-backed prices; no hardcoded React price.
router.get("/", async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT code, name, description, includes, price_cents, currency
       FROM services WHERE active = TRUE
       ORDER BY CASE code
         WHEN 'single_photo' THEN 1
         WHEN 'photo_collection' THEN 2
         WHEN 'cinematic_video' THEN 3
         ELSE 4 END, code`
    );
    res.json({ services: result.rows });
  } catch (error) {
    console.error("GET /api/services:", error);
    res.status(500).json({ error: "Could not load Porsche 911 packages." });
  }
});

export default router;
