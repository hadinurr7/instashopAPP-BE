import argon2 from "argon2";
import jwt, { sign } from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  findUserByEmailOrUsername
} from "../../models/auth/auth.models";
import {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload
} from "../../types/api/payload/auth.types";
import { sendResetEmail } from "../../lib/email";
import { JWT_SECRET, JWT_SECRET_FORGOT_PASSWORD } from "../../config";


export async function registerUser(payload: RegisterPayload) {
  const { username, email, password } = payload;

  const user = await findUserByEmailOrUsername(email, username);
  const existing = user?.email || user?.username;

  if (existing) throw new Error("email or username already registered");

  const hashedPassword = await argon2.hash(password);
  await createUser(username, email, hashedPassword);

  return { message: "Register success" };
}

export async function loginUser(payload: LoginPayload) {
  const { email, username, password } = payload;

  const user = await findUserByEmailOrUsername(email, username);
  if (!user) throw new Error("User not found");

  const isPasswordValid = await argon2.verify(user.password, password);
  if (!isPasswordValid) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id }, JWT_SECRET!, {
    expiresIn: "1h",
  });

  return {
    username: user.username,
    email: user.email,
    token,
  };
}

export const forgotPasswordService = async (payload: ForgotPasswordPayload) => {
  const { email } = payload;

  const user = await findUserByEmail(email);
  if (!user) throw new Error("User not found");

  const token = sign({ id: user.id }, JWT_SECRET_FORGOT_PASSWORD!, {
    expiresIn: "15m",
  });
  console.log(token);

  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  await sendResetEmail(user.email, resetLink, user.username);

  return {
    message: "Reset link sent to email",
    token,
  };
};




