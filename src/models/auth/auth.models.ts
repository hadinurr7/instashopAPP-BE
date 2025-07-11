import { pool } from "../../config";

export const findUserById = async (id: number) => {
  const result = await pool.query(
    `SELECT * FROM "instashopApps"."users" WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

export async function findUserByEmailOrUsername(
  email?: string,
  username?: string
) {
  const result = await pool.query(
    `SELECT * FROM "instashopApps"."users" WHERE email = $1 OR username = $2 LIMIT 1`,
    [email, username]
  );
  return result.rows[0];
}

export const createUser = async (
  username: string,
  email: string,
  hashedPassword: string
) => {
  const result = await pool.query(
    'INSERT INTO "instashopApps"."users" (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [username, email, hashedPassword]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email: string) => {
  const result = await pool.query(
    `SELECT * FROM "instashopApps"."users" WHERE email = $1 LIMIT 1`,
    [email]
  );
  return result.rows[0];
};

export const updateUserPasswordById = async (
  id: number,
  hashedPassword: string
) => {
  await pool.query(
    `UPDATE "instashopApps"."users"
     SET password = $1, updated_at = CURRENT_TIMESTAMP
     WHERE id = $2`,
    [hashedPassword, id]
  );
};

