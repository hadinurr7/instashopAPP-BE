import { pool } from "../../config";
import { CreateStoryPayload, StoryDataPayload } from "../../types/api/payload/story.types";

export const createStory = async (payload: CreateStoryPayload): Promise<StoryDataPayload> => {
  const { userId, media, content } = payload;

const result = await pool.query(
  `
  INSERT INTO "instashopApps"."stories" (user_id, media, content)
  VALUES ($1, $2, $3)
  RETURNING id, user_id AS "userId", media, content, created_at AS "createdAt"
  `,
  [userId, media, content]
);

  return result.rows[0];
};

export const getStoriesByUserId = async (
  userId: number
): Promise<StoryDataPayload[]> => {
  const result = await pool.query(
    `
    SELECT id, user_id AS "userId", media, content, created_at AS "createdAt"
    FROM "instashopApps"."stories"
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
    [userId]
  );
  return result.rows;
};

export const getFollowingStories = async (
  userId: number
): Promise<StoryDataPayload[]> => {
  const result = await pool.query(
    `
    SELECT s.id, s.user_id AS "userId", s.media, s.content, s.created_at AS "createdAt"
    FROM "instashopApps"."stories" s
    WHERE s.user_id IN (
      SELECT following_id
      FROM "instashopApps"."follows"
      WHERE follower_id = $1
    )
    ORDER BY s.created_at DESC
    `,
    [userId]
  );
  return result.rows;
};


export const getUserStories = async (userId: number): Promise<StoryDataPayload[]> => {
  const result = await pool.query(
    `
    SELECT id, user_id AS "userId", content, media, created_at AS "createdAt"
    FROM "instashopApps"."stories"
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
    [userId]
  );
  return result.rows;
};
