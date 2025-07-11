import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config";
import {
  createUser,
  findUserByEmailOrUsername
} from "../../models/auth/auth.models";
import {
  LoginPayload,
  RegisterPayload
} from "../../types/api/payload/auth.types";


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



