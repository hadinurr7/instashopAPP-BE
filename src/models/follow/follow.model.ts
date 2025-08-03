import { pool } from "../../config";

export const followUser = async (followerId: number, followingId: number) => {
  await pool.query(
    `INSERT INTO follows (follower_id, following_id) VALUES ($1, $2)`,
    [followerId, followingId]
  );
};

export const unfollowUser = async (followerId: number, followingId: number) => {
  await pool.query(
    `DELETE FROM follows WHERE follower_id = $1 AND following_id = $2`,
    [followerId, followingId]
  );
};

export const isFollowing = async (followerId: number, followingId: number) => {
  const result = await pool.query(
    `SELECT 1 FROM follows WHERE follower_id = $1 AND following_id = $2`,
    [followerId, followingId]
  );
  return result.rowCount! > 0;
};
