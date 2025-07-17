import { Request } from "express";
import { cloudinary } from "../../lib/cloudinary";
import { UploadApiResponse } from "cloudinary";
import streamifier from "streamifier";
import { createStoryService } from "../../services/story/story.service";
import { TypedResponse } from "../../types/api/response/typed.response";
import { CreateStoryResponse } from "../../types/api/response/story.response";

export const createStoryController = async (
  req: Request,
  res: TypedResponse<CreateStoryResponse>
) => {
  try {
    const userId = Number(res.locals.user.id);
    const { content } = req.body;

    const file = (req.file as Express.Multer.File) || null;

    if (!file) {
      return res.status(400).json({
        status: 0,
        message: "media is required",
        data: {},
      });
    }

    const mediaUrl: string = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "instashop_stories",
        },
        (error, result: UploadApiResponse | undefined) => {
          if (error || !result) return reject(error);
          resolve(result.secure_url);
        }
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });

    const newStory = await createStoryService({
      userId,
      content,
      media: mediaUrl,
    });

    return res.status(201).json({
      status: 1,
      message: "story created",
      data: newStory,
    });
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message:
        error instanceof Error ? error.message : "failed to create story",
      data: {},
    });
  }
};
