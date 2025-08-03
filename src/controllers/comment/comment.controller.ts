import { createCommentService, replyCommentService } from "../../services/comment/comment.service";
import { CreateCommentResponseData } from "../../types/api/response/comment.response";
import { TypedResponse } from "../../types/api/response/typed.response";

import { Request } from "express";

export const createCommentController = async (
  req: Request,
  res: TypedResponse<CreateCommentResponseData>
) => {
  const userId = Number(res.locals.user.id);
  const { postId, content } = req.body as { postId: number; content: string };

  if (!content || typeof content !== "string") {
    res.status(400).json({
      status: 0,
      message: "Content is required",
      data: {},
    });
    return;
  }

  const comment = await createCommentService(userId, postId, content);

  return res.status(201).json({
    status: 1,
    message: "Comment created",
    data: comment,
  });
};


export const replyCommentController = async (
  req: Request,
  res: TypedResponse<CreateCommentResponseData>
) => {
  const userId = Number(res.locals.user.id);
  const parentId = Number(req.params.commentId);
  const { postId, content } = req.body;

  if (!content || typeof content !== "string") {
    return res.status(400).json({
      status: 0,
      message: "Content is required",
      data: {},
    });
  }

  if (!postId || isNaN(postId)) {
    return res.status(400).json({
      status: 0,
      message: "Post ID is required",
      data: {},
    });
  }

  const replyComment = await replyCommentService(userId, postId, parentId, content);

  return res.status(201).json({
    status: 1,
    message: "Reply created",
    data: replyComment,
  });
};



