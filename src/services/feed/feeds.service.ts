import { getFeedPostsModel, getFeedStoriesModel } from "../../models/feed/feeds.models";
import { FeedPost, FeedStory } from "../../types/api/payload/feed.types";

export const getFeedPostsService = async (userId: number): Promise<FeedPost[]> => {
  return getFeedPostsModel(userId);
};

export const getFeedStoriesService = async (userId: number): Promise<FeedStory[]> => {
  return getFeedStoriesModel(userId);
};
