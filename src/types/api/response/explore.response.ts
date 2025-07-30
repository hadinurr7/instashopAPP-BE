import { GeneralResponse, Pagination } from "./api.response";

export interface ExplorePost {
  postId: number;
  userId: number;
  username: string;
  profilePicture: string;
  media: string[];
  caption: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
}

export interface ExplorePostResponse extends GeneralResponse {
  data: {
    posts: ExplorePost[];
    pagination: Pagination;
  };
}
