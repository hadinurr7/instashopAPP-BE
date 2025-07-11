import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

export const PORT = process.env.PORT;

export const JWT_SECRET = process.env.JWT_SECRET;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
