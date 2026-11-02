import { pool } from "../src/db.js";

// Prices are stored in halalas (the smallest unit of SAR), NOT in the browser.
// Running this script again updates package details and official prices.
const services = [
  {
    code: "single_photo",
    name: "Single 911 Photo",
    description: "One standout photograph of your Porsche 911, carefully composed and edited.",
    includes: "1 edited high-resolution photograph",
    priceCents: 19900,
  },
  {
    code: "photo_collection",
    name: "911 Photo Collection",
    description: "A complete set of angles and details that captures your 911's character.",
    includes: "8 edited high-resolution photographs",
    priceCents: 54900,
  },
  {
    code: "cinematic_video",
    name: "911 Cinematic Video",
    description: "A short driving film of your Porsche 911, recorded in a safe, permitted setting.",
    includes: "30–60 second edited driving video",
    priceCents: 99900,
  },
];

const db = await pool.connect();
try {
  await db.query("BEGIN");
  for (const service of services) {
    await db.query(
      `INSERT INTO services (code, name, description, includes, price_cents, currency, active)
       VALUES ($1, $2, $3, $4, $5, 'sar', TRUE)
       ON CONFLICT (code) DO UPDATE SET
         name = EXCLUDED.name, description = EXCLUDED.description,
         includes = EXCLUDED.includes, price_cents = EXCLUDED.price_cents,
         currency = EXCLUDED.currency, active = TRUE`,
      [service.code, service.name, service.description, service.includes, service.priceCents]
    );
  }
  await db.query("COMMIT");
  console.log(`Seed complete: ${services.length} Porsche 911 services created or updated.`);
} catch (error) {
  await db.query("ROLLBACK");
  console.error("Service seed failed:", error);
  process.exitCode = 1;
} finally {
  db.release();
  await pool.end();
}
