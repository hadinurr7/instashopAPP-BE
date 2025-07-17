import { Request, Response } from "express";
import { cloudinary } from "../../lib/cloudinary";
import { UploadApiResponse } from "cloudinary";
import streamifier from "streamifier";
import {
  CreatePostPayload,
  UpdatePostPayload,
} from "../../types/api/payload/post.types";
import { TypedResponse } from "../../types/api/response/typed.response";
import {
  CreatePostResponse,
  PostListResponse,
} from "../../types/api/response/post.response";
import {
  createPostService,
  deletePostService,
  getMyPostsService,
  getUserPostsService,
  updatePostService,
} from "../../services/post/post.services";

export const createPostController = async (
  req: Request,
  res: TypedResponse<CreatePostResponse>
) => {
  try {
    const userId = Number(res.locals.user.id);
    const { title, content, status } = req.body;

    if (!title) {
      res.status(400).json({
        status: 0,
        message: "title is required",
        data: {},
      });
      return;
    }

    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      res.status(400).json({
        status: 0,
        message: "media is required",
        data: {},
      });
      return;
    }

    const uploadPromises = files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: "instashop_media",
          },
          (error, result: UploadApiResponse | undefined) => {
            if (error || !result) return reject(error);
            resolve(result.secure_url);
          }
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    });

    const mediaUrls = await Promise.all(uploadPromises);

    const payload: CreatePostPayload = {
      userId,
      title,
      content,
      media: mediaUrls,
      status,
    };

    const newPost = await createPostService(payload);

    return res.status(201).json({
      status: 1,
      message: "post created",
      data: newPost,
    });
  } catch (error) {
    // console.error("create post error", error);
    return res.status(500).json({
      status: 0,
      message: error instanceof Error ? error.message : "failed to create post",
      data: {},
    });
  }
};

export const getMyPostsController = async (
  req: Request,
  res: TypedResponse<PostListResponse>
) => {
  try {
    const currentUserId = Number(res.locals.user.id);
    console.log("ini id current user :", currentUserId);

    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit as string) || 9, 1);
    const offset = (page - 1) * limit;

    const data = await getMyPostsService(currentUserId, offset, limit, page);

    res.status(200).json({
      status: 1,
      message: "my posts fetch success",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: 0,
      message: error instanceof Error ? error.message : "failed to fetch posts",
      data: {},
    });
  }
};

export const getUserPostsController = async (
  req: Request,
  res: TypedResponse<PostListResponse>
) => {
  try {
    const { username } = req.params;

    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit as string) || 9, 1);
    const offset = (page - 1) * limit;

    const data = await getUserPostsService(username, offset, limit, page);

    res.status(200).json({
      status: 1,
      message: "user posts fetch success",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: 0,
      message: error instanceof Error ? error.message : "failed to fetch posts",
      data: {},
    });
  }
};

export const updatePostController = async (
  req: Request,
  res: TypedResponse<CreatePostResponse>
) => {
  try {
    const userId = Number(res.locals.user.id);
    const postId = Number(req.params.id);
    const { title, content } = req.body;

    // console.log(userId);
    // console.log(postId);

    if (!postId) {
      res.status(400).json({
        status: 0,
        message: "post not found",
        data: {},
      });
      return;
    }

    const payload: UpdatePostPayload = {
      postId,
      userId,
      title,
      content,
    };

    const updatedPost = await updatePostService(payload);

    return res.status(200).json({
      status: 1,
      message: "post updated",
      data: updatedPost,
    });
  } catch (err) {
    return res.status(400).json({
      status: 0,
      message: err instanceof Error ? err.message : "failed to update post",
      data: {},
    });
  }
};

export const deletePostController = async (
  req: Request,
  res: TypedResponse<CreatePostResponse>
) => {
  try {
    const userId = Number(res.locals.user.id);
    const postId = Number(req.params.id);

    console.log(userId);
    console.log(postId);

    const deletedPost = await deletePostService(postId, userId);

    if (!deletedPost) {
      res.status(404).json({
        status: 0,
        message: "Post not found or already inactive",
        data: {},
      });
      return;
    }

    return res.status(200).json({
      status: 1,
      message: "post deleted",
      data: deletedPost,
    });
  } catch (err) {
    return res.status(400).json({
      status: 0,
      message: err instanceof Error ? err.message : "failed to delete post",
      data: {},
    });
  }
};
