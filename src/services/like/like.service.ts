// services/like/like.service.ts
import { findLike, createLike, deleteLike } from "../../models/like/like.models";

export const toggleLikeService = async (
  userId: number,
  targetId: number,
  targetType: "post" | "comment" | "story"
): Promise<{ liked: boolean }> => {
  const existingLike = await findLike(userId, targetId, targetType);

  if (existingLike) {
    await deleteLike(userId, targetId, targetType);
    return { liked: false };
  } else {
    await createLike(userId, targetId, targetType);
    return { liked: true };
  }
};
