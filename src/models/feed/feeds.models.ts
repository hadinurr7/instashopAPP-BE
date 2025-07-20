import { pool } from "../../config";
import { FeedPost, FeedStory } from "../../types/api/response/feed.response";

export const getFeedPostsModel = async (userId: number): Promise<FeedPost[]> => {
  const result = await pool.query(
    `
    SELECT p.id, p.user_id AS "userId", u.username, u.photo AS "userPhoto",
           p.title, p.content, p.media, p.status, p.created_at AS "createdAt"
    FROM "instashopApps"."posts" p
    JOIN "instashopApps"."users" u ON p.user_id = u.id
    WHERE p.user_id IN (
      SELECT followed_id FROM "instashopApps"."follows" WHERE follower_id = $1
    )
    ORDER BY p.created_at DESC
    `,
    [userId]
  );

  return result.rows;
};

export const getFeedStoriesModel = async (userId: number): Promise<FeedStory[]> => {
  const result = await pool.query(
    `
    SELECT s.id, s.user_id AS "userId", u.username, u.photo AS "userPhoto",
           s.media, s.content, s.created_at AS "createdAt"
    FROM "instashopApps"."stories" s
    JOIN "instashopApps"."users" u ON s.user_id = u.id
    WHERE s.user_id IN (
      SELECT followed_id FROM "instashopApps"."follows" WHERE follower_id = $1
    )
    ORDER BY s.created_at DESC
    `,
    [userId]
  );

  return result.rows;
};
