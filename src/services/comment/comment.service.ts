import { createComment } from "../../models/comment/comment.models";

export const createCommentService = async (
  userId: number,
  postId: number,
  content: string
) => {
  return await createComment(userId, postId, content);
};