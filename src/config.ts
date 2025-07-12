import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

export const PORT = process.env.PORT;

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_SECRET_FORGOT_PASSWORD = process.env.JWT_SECRET_FORGOT_PASSWORD;

export const GMAIL_EMAIL = process.env.GMAIL_EMAIL;
export const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

export const CLOUDINARY_API_KEY= process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET=process.env.CLOUDINARY_API_SECRET
export const CLOUDINARY_CLOUD_NAME=process.env.CLOUDINARY_CLOUD_NAME

// console.log({
//   CLOUDINARY_CLOUD_NAME,
//   CLOUDINARY_API_KEY,
//   CLOUDINARY_API_SECRET
// });

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
