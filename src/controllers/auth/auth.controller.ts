import { Request } from "express";
import {
  forgotPasswordService,
  loginUser,
  registerUser,
  resetPasswordService,
} from "../../services/auth/auth.services";
import {
  ForgotPasswordResponse,
  LoginResponse,
  RegisterResponse,
  ResetPasswordResponse,
} from "../../types/api/response/auth.response";
import { TypedResponse } from "../../types/api/response/typed.response";
import { ForgotPasswordPayload } from "../../types/api/payload/auth.types";

export const registerUserController = async (
  req: Request,
  res: TypedResponse<RegisterResponse>
) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({
        status: 0,
        message: "Username, email, and password are required",
        data: {},
      });
      return;
    }

    const result = await registerUser(req.body);

    res.status(201).json({
      status: 1,
      message: result.message,
      data: {},
    });
    
  } catch (error) {
    const message = error instanceof Error ? error.message : "Register failed";

    res.status(400).json({
      status: 0,
      message,
      data: {},
    });
  }
};

export const loginUserController = async (
  req: Request,
  res: TypedResponse<LoginResponse>
) => {
  try {
    const { username, email, password } = req.body;

    if (!username && !email) {
      res.status(400).json({
        status: 0,
        message: "Username or email is required",
        data: {},
      });
      return;
    }

    if (!password) {
      res.status(400).json({
        status: 0,
        message: "password are required",
        data: {},
      });
      return;
    }
    const result = await loginUser(req.body);

    res.status(200).json({
      status: 1,
      message: "Login success",
      data: result,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Login failed";

    res.status(401).json({
      status: 0,
      message,
      data: {},
    });
  }
};

export const forgotPasswordController = async (
  req: Request,
  res: TypedResponse<ForgotPasswordResponse>
) => {
  try {
    const payload: ForgotPasswordPayload = req.body;

    if (!payload.email) {
      res.status(400).json({
        status: 0,
        message: "Email is required",
        data: {},
      });
      return;
    }

    const result = await forgotPasswordService(payload);

    res.status(200).json({
      status: 1,
      message: result.message,
      data: { token: result.token },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send reset link";

    res.status(400).json({
      status: 0,
      message,
      data: {},
    });
  }
};

export const resetPasswordController = async (
  req: Request,
  res: TypedResponse<ResetPasswordResponse>
) => {
  try {
    const id = Number(res.locals.user.id);

    if (!id) {
      res.status(401).json({
        status: 0,
        message: "Unauthorized or invalid reset token",
        data: {},
      });
      return;
    }

    const { newPassword } = req.body;

    if (!newPassword) {
      res.status(400).json({
        status: 0,
        message: "New password is required",
        data: {},
      });
      return;
    }

    const result = await resetPasswordService({ id, newPassword });

    res.status(200).json({
      status: 1,
      message: result.message,
      data: {},
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to reset password";

    res.status(400).json({
      status: 0,
      message,
      data: {},
    });
  }
};
