import { pool } from "../src/db.js";
import { photos } from "../data/cars.js";

const client = await pool.connect();
try {
  await client.query("BEGIN");
  for (const photo of photos) {
    await client.query(
      `INSERT INTO cars
        (id, title, category, description, image_url, alt_text, photographer, source_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (id) DO UPDATE SET
         title = EXCLUDED.title,
         category = EXCLUDED.category,
         description = EXCLUDED.description,
         image_url = EXCLUDED.image_url,
         alt_text = EXCLUDED.alt_text,
         photographer = EXCLUDED.photographer,
         source_url = EXCLUDED.source_url`,
      [photo.id, photo.title, photo.category, photo.description,
       photo.image, photo.alt, photo.photographer, photo.source]
    );
  }
  await client.query("COMMIT");
  console.log(`Seed complete: ${photos.length} cars inserted or updated.`);
} catch (error) {
  await client.query("ROLLBACK");
  console.error("Seed failed:", error.message);
  process.exitCode = 1;
} finally {
  client.release();
  await pool.end();
}
