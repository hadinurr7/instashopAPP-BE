import { createComment, createReplyComment } from "../../models/comment/comment.models";

export const createCommentService = async (
  userId: number,
  postId: number,
  content: string
) => {
  return await createComment(userId, postId, content);
};


export const replyCommentService = async (
  userId: number,
  postId: number,
  parentId: number,
  content: string
) => {
  return await createReplyComment(userId, postId, parentId, content);
};
