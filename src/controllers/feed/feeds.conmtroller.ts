import { Request } from "express";
import { TypedResponse } from "../../types/api/response/typed.response";
import { getFeedPostsService, getFeedStoriesService } from "../../services/feed/feeds.service";
import { FeedPostResponse, FeedStoryResponse } from "../../types/api/response/feed.response";

export const getFeedPostsController = async (
  req: Request,
  res: TypedResponse<FeedPostResponse>
) => {
  try {
    const userId = Number(res.locals.user.id);
    const posts = await getFeedPostsService(userId);

    return res.status(200).json({
      status: 1,
      message: "Feed posts fetched",
      data: posts,
    });
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: "Failed to fetch feed posts",
      data: [],
    });
  }
};

export const getFeedStoriesController = async (
  req: Request,
  res: TypedResponse<FeedStoryResponse>
) => {
  try {
    const userId = Number(res.locals.user.id);
    const stories = await getFeedStoriesService(userId);

    return res.status(200).json({
      status: 1,
      message: "Feed stories fetched",
      data: stories,
    });
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: "Failed to fetch feed stories",
      data: [],
    });
  }
};
