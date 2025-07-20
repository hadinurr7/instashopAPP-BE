import { GeneralResponse } from "../response/api.response";

export interface CreateStoryPayload {
  userId: number;
  media: string;
  content?: string
}

export interface StoryDataPayload extends GeneralResponse {
  id: number;
  userId: number;
  media: string;
  content: string | null
  createdAt: string;
}
