import { createCommentService } from "../../services/comment/comment.service";
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
