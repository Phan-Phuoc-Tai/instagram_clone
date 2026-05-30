import { API } from "@/constants/config.constant";
import { axiosInstance } from "@/lib/axios";
import type { Post, PostResponse } from "@/types/post.type";

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
  getPostById: async (postId: string): Promise<Post> => {
    const response = await axiosInstance.get(API.POSTS.POST_DETAIL(postId));
    const { data } = response.data;
    return data;
  },
  likePost: async (postId: string): Promise<Post> => {
    const response = await axiosInstance.post(API.POSTS.LIKE_POST(postId));
    const { data } = response.data;
    return data;
  },
  unlikePost: async (postId: string): Promise<Post> => {
    const response = await axiosInstance.delete(API.POSTS.LIKE_POST(postId));
    const { data } = response.data;
    return data;
  },
  savePost: async (postId: string): Promise<Post> => {
    const response = await axiosInstance.post(API.POSTS.SAVE_POST(postId));
    const { data } = response.data;
    return data;
  },
  unsavePost: async (postId: string): Promise<Post> => {
    const response = await axiosInstance.delete(API.POSTS.SAVE_POST(postId));
    const { data } = response.data;
    return data;
  },
};
