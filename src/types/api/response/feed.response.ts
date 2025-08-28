import { GeneralResponse } from "./api.response";

export interface FeedPost {
  id: number;
  userId: number;
  name: string;
  profilePicture: string;
  content: string;
  media: string;
  createdAt: string;
}

export interface FeedStory {
  name: string;
  profilePicture: string;
  id: number;
  userId: number;
  content: string | null;
  media: string;
  createdAt: string;
}

export interface FeedPostResponse extends GeneralResponse {
  data: FeedPost[];
}

export interface FeedStoryResponse extends GeneralResponse {
  data: FeedStory[];
}

export interface FeedDataPayload {
  posts: FeedPost[];
  stories: FeedStory[];
}
