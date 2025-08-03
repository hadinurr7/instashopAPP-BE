import { Request } from "express";
import { toggleFollowService } from "../../services/follow/follow.service";
import { TypedResponse } from "../../types/api/response/typed.response";
import { ToggleFollowResponse } from "../../types/api/response/follow.response";

export const toggleFollowController = async (
  req: Request,
  res: TypedResponse<ToggleFollowResponse>
) => {
  const followerId = Number(res.locals.user.id);
  const followingId = Number(req.params.id);

  if (followerId === followingId) {
    return res.status(400).json({
      status: 0,
      message: "You cannot follow yourself",
      data: {},
    });
  }

  const result = await toggleFollowService(followerId, followingId);

  return res.status(200).json({
    status: 1,
    message: result.following ? "Followed successfully" : "Unfollowed successfully",
    data: result,
  });
};
