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

