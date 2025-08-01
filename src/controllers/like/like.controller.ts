import { Request, Response } from "express";
import { toggleLikeService } from "../../services/like/like.service";

export const toggleLikeController = async (
  req: Request<{ type: string; id: string }>,
  res: Response
) => {
  const userId = Number(res.locals.user.id);
  const targetId = Number(req.params.id);
  const targetType = req.params.type;

  if (isNaN(targetId)) {
    return res.status(400).json({
      status: 0,
      message: "Invalid target ID",
      data: { liked: false },
    });
  }

  if (!["post", "comment", "story"].includes(targetType)) {
    return res.status(400).json({
      status: 0,
      message: "Invalid target type",
      data: { liked: false },
    });
  }

  const result = await toggleLikeService(
    userId,
    targetId,
    targetType as "post" | "comment" | "story"
  );

  return res.status(200).json({
    status: 1,
    message: result.liked ? `${targetType} liked` : `${targetType} unliked`,
    data: { liked: result.liked },
  });
};
