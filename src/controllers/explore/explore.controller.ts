import { Request, Response } from "express";
import { getExplorePostsService } from "../../services/explore/explore.service";
import { ExplorePostResponse } from "../../types/api/response/explore.response";

export const getExplorePostsController = async (req: Request, res: Response<ExplorePostResponse>) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const result = await getExplorePostsService(page, limit);

  res.json({
    status: 1,
    message: "Explore posts fetched successfully",
    data: result,
  });
};
