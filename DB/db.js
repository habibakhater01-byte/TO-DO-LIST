import "dotenv/config";
import pg from "pg";

export const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
});

export async function checkConnection() {
  try {
    await pool.query("SELECT 1");
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
}

export async function createTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS TODO (
      id serial PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      body VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      done BOOLEAN DEFAULT FALSE,
      archived BOOLEAN NOT NULL DEFAULT FALSE
    )
  `);
  console.log("Table ready");
}