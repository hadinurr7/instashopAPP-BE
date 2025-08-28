import {
  findUserById,
  getFollowers,
  getFollowing,
  getUserByIdWithDetails,
  getUserByUsernameWithDetails,
  updateUserDetails,
} from "../../models/user/user.models";
import {
  GetMyProfilePayload,
  GetUserProfilePayload,
  UpdateUserDetailsPayload,
} from "../../types/api/payload/user.types";

const UserDetails = async (targetUserId: number, currentUserId: number) => {
  const user = await getUserByIdWithDetails(targetUserId);
  const followers = await getFollowers(targetUserId);
  const following = await getFollowing(targetUserId);

  return {
    id: user.id,
    username: user.username,
    fullname: user.fullname,
    profilePicture: user.profile_picture,
    bio: user.bio,
    totalFollowers: followers.length,
    totalFollowing: following.length,
    totalPosts: user.total_posts,
    isPrivate: user.is_private,
    followedBy: followers.map((follower) => ({
      userId: follower.id,
      username: follower.username,
      profilePicture: follower.profile_picture,
    })),
  };
};

export const getUserDetailsService = async (payload: GetUserProfilePayload) => {
  const { username, currentUserId } = payload;

  const user = await getUserByUsernameWithDetails(username);
  if (!user) throw new Error("User not found");

  return UserDetails(user.id, currentUserId);
};

export const getMyDetailsService = async (payload: GetMyProfilePayload) => {
  const { userId } = payload;

  const user = await getUserByIdWithDetails(userId);
  if (!user) throw new Error("User not found");

  return await UserDetails(user.id, userId);
};

export async function UpdateUserDetailsService(
  payload: UpdateUserDetailsPayload
) {
  const { userId, fullname, bio, profilePicture, isPrivate } = payload;

  const currentUser = await findUserById(userId);
  if (!currentUser) {
    throw new Error("User not found");
  }

  const updatedUser = await updateUserDetails(
    userId,
    fullname,
    bio,
    profilePicture,
    isPrivate
  );

  return {
    data: updatedUser,
  };
}
