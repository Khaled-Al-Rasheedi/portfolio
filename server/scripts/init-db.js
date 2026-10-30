import { readFile } from "node:fs/promises";
import { pool } from "../src/db.js";

try {
  const sql = await readFile(new URL("../sql/schema.sql", import.meta.url), "utf8");
  await pool.query(sql);
  console.log("Database initialized: users and cars tables are ready.");
} catch (error) {
  console.error("Database initialization failed:", error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
