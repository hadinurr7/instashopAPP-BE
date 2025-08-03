import { GeneralResponse } from "./api.response";

export interface ToggleFollowResponse extends GeneralResponse {
  data: {
    following: boolean;
  } | Record<string, never>;
}
