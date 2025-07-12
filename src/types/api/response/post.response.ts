import { GeneralResponse, Pagination } from "./api.response";

export interface PostData {
  id: number;
  title: string;
  content: string | null;
  media: string[];
  status: string;
  createdAt: string;
}

export interface GetPostResponse extends Pagination {
  username : string
}


export interface CreatePostResponse extends GeneralResponse {
  data: PostData | Record<string, never>;
}

export interface PostListResponse extends GeneralResponse {
  data:
    | {
        posts: PostData[];    
      }
    | Record<string, never>;
}

export interface PostDetailResponse extends GeneralResponse {
  data: PostData | Record<string, never>;
}