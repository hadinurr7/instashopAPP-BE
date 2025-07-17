import { GeneralResponse } from "../response/api.response";
import { StoryDataPayload } from "../payload/story.types";

export interface CreateStoryResponse extends GeneralResponse {
  data: StoryDataPayload | Record<string, never>;
}