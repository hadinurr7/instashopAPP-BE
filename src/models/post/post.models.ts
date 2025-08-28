import { pool } from "../../config";
import {
  CreatePostPayload,
  PostDataPayload,
  UpdatePostPayload,
} from "../../types/api/payload/post.types";

export const createPost = async (
  payload: CreatePostPayload
): Promise<PostDataPayload> => {
  const { userId, title, content, media, status } = payload;

  const result = await pool.query(
    `
    INSERT INTO "instashopApps"."posts" (user_id, title, content, media, status)
    VALUES ($1, $2, $3, $4::text[], $5)
    RETURNING id, user_id AS "userId", title, content, media, status, created_at AS "createdAt"
    `,
    [userId, title, content, media, status]
  );

  return result.rows[0];
};

export const getPosts = async (
  userId: number,
  limit: number,
  offset: number
) => {
  const result = await pool.query(
    `
    SELECT p.id,
           p.title,
           p.content,
           p.media,
           p.status,
           p.created_at AS "createdAt",
           COALESCE(l.count, 0) AS likes,
           COALESCE(c.count, 0) AS comments
    FROM "instashopApps"."posts" p
    LEFT JOIN (
      SELECT post_id, COUNT(*) AS count
      FROM "instashopApps"."likes"
      GROUP BY post_id
    ) l ON l.post_id = p.id
    LEFT JOIN (
      SELECT post_id, COUNT(*) AS count
      FROM "instashopApps"."comments"
      GROUP BY post_id
    ) c ON c.post_id = p.id
    WHERE p.user_id = $1
      AND p.status = 'active'
    ORDER BY p.created_at DESC
    LIMIT $2 OFFSET $3
    `,
    [userId, limit, offset]
  );
  return result.rows;
};

export const countUserPosts = async (userId: number) => {
  const result = await pool.query(
    `
    SELECT COUNT(*)
    FROM   "instashopApps"."posts"
    WHERE  user_id = $1
    AND    status  = 'active'
    `,
    [userId]
  );
  return parseInt(result.rows[0].count, 10);
};

export const updatePost = async (
  payload: UpdatePostPayload
): Promise<PostDataPayload> => {
  const { postId, userId, title, content } = payload;

  const result = await pool.query(
    `
    UPDATE "instashopApps"."posts"
    SET
      title       = COALESCE($3, title),
      content     = COALESCE($4, content),
      updated_at  = CURRENT_TIMESTAMP
    WHERE id = $1 AND user_id = $2 AND status = 'active'
    RETURNING id, user_id AS "userId", title, content, media, status, created_at AS "createdAt"
    `,
    [postId, userId, title, content]
  );

  return result.rows[0];
};

export const deletePost = async (
  postId: number,
  userId: number
): Promise<PostDataPayload> => {
  const result = await pool.query(
    `
    UPDATE "instashopApps"."posts"
    SET status = 'innactive', updated_at = NOW()
    WHERE id = $1 AND user_id = $2 AND status = 'active'
    RETURNING id, user_id AS "userId", title, content, media, status, created_at AS "createdAt"
    `,
    [postId, userId]
  );
  return result.rows[0];
};
