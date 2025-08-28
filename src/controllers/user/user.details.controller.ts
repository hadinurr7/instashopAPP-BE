import { Request } from "express";
import {
  getMyDetailsService,
  getUserDetailsService,
  UpdateUserDetailsService
} from "../../services/user/user.details.services";
import { GetMyProfilePayload, GetUserProfilePayload } from "../../types/api/payload/user.types";
import { TypedResponse } from "../../types/api/response/typed.response";
import { UserDetailsResponse } from "../../types/api/response/user.response";


export const getUserDetailsController = async (
  req: Request,
  res: TypedResponse<UserDetailsResponse>
) => {
  try {
    const { username } = req.params;
    const currentUserId = Number(res.locals.user.id);

    const payload: GetUserProfilePayload = {
      username,
      currentUserId,
    };

    const data = await getUserDetailsService(payload);

    res.status(200).json({
      status: 1,
      message: "user profile fetch success",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: 0,
      message: error instanceof Error ? error.message : "failed to load profile",
      data: {} 
    });
  }
};


export const getMyDetailsController = async (req: Request, res: TypedResponse<UserDetailsResponse>) => {
  try {
    const userId = Number(res.locals.user.id);
    const payload: GetMyProfilePayload = {
      userId,
    };
    const data = await getMyDetailsService(payload);

    res.status(200).json({
      status: 1,
      message: "user profile fetch success",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: 0,
      message:
        error instanceof Error ? error.message : "failed to load profile",
      data: {},
    });
  }
};


export const updateUserDetailsController = async (
  req: Request,
  res: TypedResponse<UserDetailsResponse>
) => {
  try {
    const userId = Number(res.locals.user.id);
    const { fullname, bio, profilePicture, isPrivate } = req.body;
    
    const payload = {
      userId,
      fullname,
      bio,
      profilePicture,
      isPrivate
    };

    const result = await UpdateUserDetailsService(payload);

    res.status(200).json({
      status: 1,
      message: "Profile updated successfully",
      data: result.data,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update profile";
    res.status(400).json({
      status: 0,
      message,
      data: {},
    });
  }
};