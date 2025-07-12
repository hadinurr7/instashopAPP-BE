import { createPost } from "../../models/post/post.models";
import {
  CreatePostPayload,
  PostDataPayload,
} from "../../types/api/payload/post.types";

export const createPostService = async (
  payload: CreatePostPayload): Promise<PostDataPayload> => {
  return createPost(payload);
};

