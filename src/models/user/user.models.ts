import { pool } from "../../config";
import { UpdateUserDetailsPayload } from "../../types/api/payload/user.types";

export const getUserByIdWithDetails = async (userId: number) => {
  const result = await pool.query(
    `
    SELECT id, username, fullname, bio, profile_picture, is_private,
      (
        SELECT COUNT(*) 
        FROM "instashopApps"."posts" 
        WHERE user_id = "instashopApps"."users".id
      ) AS total_posts
    FROM "instashopApps"."users"
    WHERE id = $1
    `,
    [userId]
  );
  return result.rows[0];
};

export const getUserByUsernameWithDetails = async (username: string) => {
  const result = await pool.query(
    `
    SELECT id, username, fullname, bio, profile_picture, is_private,
      (
        SELECT COUNT(*) 
        FROM "instashopApps"."posts" 
        WHERE user_id = "instashopApps"."users".id
      ) AS total_posts
    FROM "instashopApps"."users"
    WHERE username = $1
    `,
    [username]
  );
  return result.rows[0];
};

export const getFollowers = async (userId: number) => {
  const result = await pool.query(
    `
    SELECT u.id, u.username, u.profile_picture
    FROM "instashopApps"."follows" f
    JOIN "instashopApps"."users" u ON u.id = f.follower_id
    WHERE f.following_id = $1
    `,
    [userId]
  );
  return result.rows;
};

export const getFollowing = async (userId: number) => {
  const result = await pool.query(
    `
    SELECT u.id, u.username, u.profile_picture
    FROM "instashopApps"."follows" f
    JOIN "instashopApps"."users" u ON u.id = f.following_id
    WHERE f.follower_id = $1
    `,
    [userId]
  );
  return result.rows;
};

export const isFollowedByUser = async (
  targetUserId: number,
  currentUserId: number
) => {
  const result = await pool.query(
    `
    SELECT 1
    FROM "instashopApps"."follows"
    WHERE follower_id = $1 AND following_id = $2
    `,
    [currentUserId, targetUserId]
  );
  return result.rowCount ?? 0;
};




