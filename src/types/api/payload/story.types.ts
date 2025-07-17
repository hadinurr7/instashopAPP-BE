export interface CreateStoryPayload {
  userId: number;
  media: string;
  content?: string
}

export interface StoryDataPayload {
  id: number;
  userId: number;
  media: string;
  content: string | null
  createdAt: string;
}
