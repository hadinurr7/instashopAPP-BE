import { pool } from "../../config";

export const createComment = async (
  userId: number,
  postId: number,
  content: string
) => {
  const result = await pool.query(
    `INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3) RETURNING *`,
    [userId, postId, content]
  );
  return result.rows[0];
};