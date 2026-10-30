import "dotenv/config";
import pg from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing. Add it to server/.env");
}

const { Pool } = pg;

// pg reads sslmode=require from a Neon connection string.
// For local PostgreSQL, use a URL without sslmode=require.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
});
