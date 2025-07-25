import { GeneralResponse } from "./api.response";

export interface FeedPost {
  id: number;
  userId: number;
  name: string; // nama user
  profilePicture: string; // foto user
  content: string;
  media: string;
  createdAt: string;
}

export interface FeedStory {
  id: number;
  userId: number;
  name: string;
  profilePicture: string;
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
