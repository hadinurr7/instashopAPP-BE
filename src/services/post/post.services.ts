import { countUserPosts, createPost, deletePost, getPosts, updatePost } from "../../models/post/post.models";
import { getUserByUsernameWithDetails } from "../../models/user/user.models";
import {
  CreatePostPayload,
  PostDataPayload,
  UpdatePostPayload,
} from "../../types/api/payload/post.types";

export const createPostService = async (
  payload: CreatePostPayload): Promise<PostDataPayload> => {
  return createPost(payload);
};


export const getUserPostsService = async (
  username: string,
  offset: number,
  limit: number,
  page: number
) => {
  const user = await getUserByUsernameWithDetails(username);
  if (!user) throw new Error("User not found");

  return buildPostsPayload(user.id, offset, limit, page);
};

export const getMyPostsService = async (userId: number, offset: number, limit: number, page: number) => {
  const posts = await getPosts(userId, limit, offset);
  const totalPosts = await countUserPosts(userId);

  return {
    page,
    limit,
    totalPosts,
    totalPages: Math.ceil(totalPosts / limit),
    posts
  };
};

const buildPostsPayload = async (
  userId: number,
  offset: number,
  limit: number,
  page: number
) => {
  const posts = await getPosts(userId, limit, offset);
  const total = await countUserPosts(userId);

  return {
    posts,
    pagination: {
      page,
      limit,
      totalPage: Math.ceil(total / limit),
      totalData: total,
    },
  };
};

export const updatePostService = async (
  payload: UpdatePostPayload
): Promise<PostDataPayload> => {
  return updatePost(payload);
};

export const deletePostService = async (
  postId: number,
  userId: number
): Promise<PostDataPayload> => {
  return deletePost(postId, userId);
};