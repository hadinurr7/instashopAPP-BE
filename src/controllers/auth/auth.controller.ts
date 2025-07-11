import { Request } from "express";
import {
  registerUser
} from "../../services/auth/auth.services";
import {
  RegisterResponse
} from "../../types/api/response/auth.response";
import { TypedResponse } from "../../types/api/response/typed.response";

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


