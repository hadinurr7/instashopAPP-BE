import { FeedPost, FeedStory } from "../response/feed.response";

export interface FeedDataPayload {
  posts: FeedPost[];
  stories: FeedStory[];
}