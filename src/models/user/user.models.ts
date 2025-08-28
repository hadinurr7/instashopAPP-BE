import { pool } from "../../config";
import { UpdateUserDetailsPayload } from "../../types/api/payload/user.types";

export const findUserById = async (id: number) => {
  const result = await pool.query(
    `SELECT * FROM "instashopApps"."users" WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

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

export const updateUserDetails = async (
  userId: number,
  fullname?: string | null,
  bio?: string | null,
  profilePicture?: string | null,
  isPrivate?: boolean
) => {
  const result = await pool.query(
    `UPDATE "instashopApps"."users" 
     SET fullname = COALESCE($2, fullname),
         bio = COALESCE($3, bio),
         profile_picture = COALESCE($4, profile_picture),
         is_private = COALESCE($5, is_private)
     WHERE id = $1
     RETURNING id, username, fullname, bio, profile_picture, is_private`,
    [userId, fullname, bio, profilePicture, isPrivate]
  );
  return result.rows[0];
};





