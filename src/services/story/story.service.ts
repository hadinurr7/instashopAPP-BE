import { createStory, getFollowingStories, getStoriesByUserId, getUserStories } from "../../models/story/story.models";
import { CreateStoryPayload, StoryDataPayload } from "../../types/api/payload/story.types";


export const createStoryService = async (
  payload: CreateStoryPayload
): Promise<StoryDataPayload> => {
  return createStory(payload);
};

export const getMyStoriesService = async (userId: number) => {
  return getStoriesByUserId(userId);
};

export const getFollowingsStoriesService = async (userId: number) => {
  return getFollowingStories(userId);
};

export const getUserStoriesService = async (userId: number): Promise<StoryDataPayload[]> => {
  return getUserStories(userId);
};
