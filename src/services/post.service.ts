import { API } from "@/constants/config.constant";
import { axiosInstance } from "@/lib/axios";
import type { PostResponse } from "@/types/post.type";

export const postService = {
  getNewsFeed: async ({ pageParam = 1 }): Promise<PostResponse> => {
    const limit = 5;
    const offset = (pageParam - 1) * limit;
    const response = await axiosInstance(API.POSTS.NEWS_FEED(limit, offset));
    const { data } = response.data;
    const { total, limit: limitResponse, posts } = data;
    const totalPages = Math.floor(total / limitResponse);
    return {
      posts,
      totalPages,
      currentPage: pageParam,
    };
  },
};
