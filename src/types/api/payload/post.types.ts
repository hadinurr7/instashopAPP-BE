export interface PostDataPayload {
  id: number;
  title: string;
  content: string | null;
  media: string[];
  status: string;
  createdAt: string;
}

export interface CreatePostPayload {
  userId: number;
  title: string;
  content?: string;
  media: string[];
  status?: "active" | "innactive";
}
