import { getExplorePosts } from "../../models/explore/explore.models";

export const getExplorePostsService = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const { posts, totalData } = await getExplorePosts(limit, offset);

  return {
    posts,
    pagination: {
      totalPage: Math.ceil(totalData / limit),
      totalData,
      page,
      offset,
    },
  };
};
