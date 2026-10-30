import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// SQL aliases preserve the exact data shape used by the old React cards.
const selectCars = `SELECT id, title, category, description,
  image_url AS image, alt_text AS alt,
  photographer, source_url AS source FROM cars`;

function asPhoto(row) {
  return {
    ...row,
    number: `SHOT ${String(row.id).padStart(2, "0")}`,
  };
}

// GET /api/cars -> { cars: [ ... ] }
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`${selectCars} ORDER BY id`);
    res.json({ cars: result.rows.map(asPhoto) });
  } catch (error) {
    console.error("GET /api/cars:", error);
    res.status(500).json({ error: "Could not load cars" });
  }
});

// GET /api/cars/count -> { count: 8 }
router.get("/count", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*)::int AS count FROM cars");
    res.json({ count: result.rows[0].count });
  } catch (error) {
    console.error("GET /api/cars/count:", error);
    res.status(500).json({ error: "Could not count cars" });
  }
});

// GET /api/cars/3 -> { car: { ... } }
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Car ID must be a positive integer" });
  }
  try {
    const result = await pool.query(`${selectCars} WHERE id = $1`, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json({ car: asPhoto(result.rows[0]) });
  } catch (error) {
    console.error("GET /api/cars/:id:", error);
    res.status(500).json({ error: "Could not load car" });
  }
});

export default router;
