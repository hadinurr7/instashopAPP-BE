import { GeneralResponse } from "./api.response";

export interface UserDetailsData {
  id: number;
  username: string;
  fullname: string | null;
  profilePicture: string | null;
  bio: string | null;
  totalFollowers: number;
  totalFollowing: number;
  totalPosts: number;
  isPrivate: boolean;
  followedBy: {
    userId: number;
    username: string;
    profilePicture: string | null;
  }[];
}
export interface UserDetailsResponse extends GeneralResponse {
  data: UserDetailsData | Record<string, never>;
}
export interface UpdateUserDetailsResponse extends GeneralResponse {
  data: Record<string, never>;
}