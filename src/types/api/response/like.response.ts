import { GeneralResponse } from "./api.response";

export interface LikePostData extends GeneralResponse {
  id: number;
  userId: number;
  postId: number;
  createdAt: string;
}

export interface ToggleLikePostResponse extends GeneralResponse {
  data: {
    liked: boolean;
  };
}

