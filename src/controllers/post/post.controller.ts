import { Request, Response } from "express";import { cloudinary } from "../../lib/cloudinary";
import { UploadApiResponse } from "cloudinary";
import streamifier from "streamifier";
import { CreatePostPayload } from "../../types/api/payload/post.types";
import { TypedResponse } from "../../types/api/response/typed.response";
import { CreatePostResponse } from "../../types/api/response/post.response";
import { createPostService } from "../../services/post/post.services";

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
      return
    }

    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
       res.status(400).json({
        status: 0,
        message: "media is required",
        data: {},
      });
      return
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
    console.error("CREATE POST ERROR", error);
    return res.status(500).json({
      status: 0,
      message: error instanceof Error ? error.message : "failed to create post",
      data: {},
    });
  }
};
