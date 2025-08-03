import { pool } from "../../config";

export const createComment = async (
  userId: number,
  postId: number,
  content: string
) => {
  const result = await pool.query(
    `INSERT INTO "instashopApps"."comments" (user_id, post_id, content) VALUES ($1, $2, $3) RETURNING *`,
    [userId, postId, content]
  );
  return result.rows[0];
};

export const createReplyComment = async (
  userId: number,
  postId: number,
  parentId: number,
  content: string
) => {
  const result = await pool.query(
    `
    INSERT INTO comments (user_id, post_id, parent_id, content)
    VALUES ($1, $2, $3, $4)
    RETURNING id, user_id, post_id, parent_id, content, created_at
    `,
    [userId, postId, parentId, content]
  );

  return result.rows[0];
};
