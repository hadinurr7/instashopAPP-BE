import { followUser, unfollowUser, isFollowing } from "../../models/follow/follow.model";

export const toggleFollowService = async (followerId: number, followingId: number) => {
  const alreadyFollowing = await isFollowing(followerId, followingId);

  if (alreadyFollowing) {
    await unfollowUser(followerId, followingId);
    return { following: false };
  } else {
    await followUser(followerId, followingId);
    return { following: true };
  }
};
