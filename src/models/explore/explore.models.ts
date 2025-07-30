import { pool } from "../../config";

export const getExplorePosts = async (limit: number, offset: number) => {
  const result = await pool.query(
    `
    SELECT  p.id AS post_id, p.user_id, u.username, u.profile_picture, p.media, p.caption, p.created_at,
      (
        SELECT COUNT(*) FROM "instashopApps"."likes" l WHERE l.target_id = p.id AND l.target_type = 'post'
      ) AS likes_count,
      (
        SELECT COUNT(*) FROM "instashopApps"."comments" c WHERE c.post_id = p.id
      ) AS comments_count
    FROM "instashopApps"."posts" p
    JOIN users u ON u.id = p.user_id
    ORDER BY p.created_at DESC
    LIMIT $1 OFFSET $2
    `,
    [limit, offset]
  );

  const total = await pool.query(`SELECT COUNT(*) FROM "instashopApps"."posts"`);
  return {
    posts: result.rows,
    totalData: Number(total.rows[0].count),
  };
};
