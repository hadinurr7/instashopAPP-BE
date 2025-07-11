import argon2 from "argon2";
import {
  createUser,
  findUserByEmailOrUsername
} from "../../models/auth/auth.models";
import {
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


