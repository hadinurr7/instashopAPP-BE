import { pool } from "../../config";

export const findLike = async (
  userId: number,
  targetId: number,
  targetType: "post" | "comment" | "story"
) => {
  const result = await pool.query(
    `SELECT * FROM "instashopApps"."likes" WHERE user_id = $1 AND target_id = $2 AND target_type = $3`,
    [userId, targetId, targetType]
  );
  return result.rows[0];
};

export const createLike = async (
  userId: number,
  targetId: number,
  targetType: "post" | "comment" | "story"
) => {
  await pool.query(
    `INSERT INTO "instashopApps"."likes" (user_id, target_id, target_type) VALUES ($1, $2, $3)`,
    [userId, targetId, targetType]
  );
};

export const deleteLike = async (
  userId: number,
  targetId: number,
  targetType: "post" | "comment" | "story"
) => {
  await pool.query(
    `DELETE FROM "instashopApps"."likes" WHERE user_id = $1 AND target_id = $2 AND target_type = $3`,
    [userId, targetId, targetType]
  );
};
