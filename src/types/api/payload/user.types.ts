export interface GetUserProfilePayload {
  username: string;
  currentUserId: number;
}

export interface GetMyProfilePayload {
  userId: number;
}

export interface UpdateUserDetailsPayload {
  userId: number;
  fullname?: string | null;
  bio?: string | null;
  profilePicture?: string | null;
  isPrivate?: boolean;
}

export interface GetUserPostsPayload {
  username: string;
  page: number;
  limit: number;
}

export interface GetMyPostsPayload {
  userId: number;
  page: number;
  limit: number;
}
