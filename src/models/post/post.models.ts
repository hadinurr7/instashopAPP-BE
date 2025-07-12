import { pool } from "../../config";
import {
  CreatePostPayload,
  PostDataPayload,
} from "../../types/api/payload/post.types";

export const createPost = async (payload: CreatePostPayload): Promise<PostDataPayload> =>  {
  const {
    userId,
    title,
    content,
    media = [],
    status = "draft",
  } = payload;

  const result = await pool.query(
    `
    INSERT INTO "instashopApps"."posts" (user_id, title, content, media, status)
    VALUES ($1, $2, $3, $4::text[], $5)
    RETURNING id,
              user_id AS "userId",
              title,
              content,
              media,
              status,
              created_at AS "createdAt"
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
    SELECT id, title, content, media, status, created_at AS "createdAt"
    FROM   "instashopApps"."posts"
    WHERE  user_id = $1 AND deleted_at IS NULL
    ORDER  BY created_at DESC
    LIMIT  $2 OFFSET $3
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
    `,
    [userId]
  );
  return parseInt(result.rows[0].count, 10);
};
