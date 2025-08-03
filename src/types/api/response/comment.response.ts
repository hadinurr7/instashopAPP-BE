import { GeneralResponse } from "./api.response";

export interface CommentData {
  id: number;
  user_id: number;
  post_id: number;
  content: string;
  created_at: string;
}

export interface CreateCommentResponseData extends GeneralResponse {
  data: CommentData  | Record<string, never>;
}


