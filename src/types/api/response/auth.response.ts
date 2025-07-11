import { GeneralResponse } from "./api.response";

export interface RegisterResponse extends GeneralResponse {
  data: {};
}

export interface LoginResponse extends GeneralResponse {
  data: {
    username?: string;
    email?: string;
    token?: string;
  };
}

export interface ForgotPasswordResponse extends GeneralResponse {
  data: {};
}

export interface ResetPasswordResponse extends GeneralResponse {
  data: {};
}