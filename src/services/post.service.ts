import { API } from "../constants/config.constant";
import { axiosInstance } from "../lib/axios";
import type {
  Comment,
  CommentResponse,
  PostType,
  PostResponse,
  ReplyResponse,
} from "../types/post.type";

export const postService = {
  getNewsFeed: async ({ pageParam = 1 }): Promise<PostResponse> => {
    const limit = 5;
    const offset = (pageParam - 1) * limit;
    const response = await axiosInstance(API.POSTS.NEWS_FEED(limit, offset));
    const { data } = response.data;
    const { total, limit: limitResponse, posts } = data;
    const totalPages = Math.ceil(total / limitResponse);
    return {
      posts,
      totalPages,
      currentPage: pageParam,
    };
  },
  getPostById: async (postId: string): Promise<PostType> => {
    const response = await axiosInstance.get(API.POSTS.POST_ID(postId));
    const { data } = response.data;
    return data;
  },
  createPost: async (file: File, caption: string): Promise<PostType> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);
    const response = await axiosInstance.post(API.POSTS.POST, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { data } = response.data;
    return data;
  },
  updatePost: async (postId: string, caption: string): Promise<PostType> => {
    const response = await axiosInstance.patch(API.POSTS.POST_ID(postId), {
      caption,
    });
    const { data } = response.data;
    return data;
  },
  deletePost: async (postId: string) => {
    const response = await axiosInstance.delete(API.POSTS.POST_ID(postId));
    const { success } = response.data;
    return success;
  },

  likePost: async (postId: string): Promise<PostType> => {
    const response = await axiosInstance.post(API.POSTS.LIKE_POST(postId));
    const { data } = response.data;
    return data;
  },
  unlikePost: async (postId: string): Promise<PostType> => {
    const response = await axiosInstance.delete(API.POSTS.LIKE_POST(postId));
    const { data } = response.data;
    return data;
  },
  savePost: async (postId: string): Promise<PostType> => {
    const response = await axiosInstance.post(API.POSTS.SAVE_POST(postId));
    const { data } = response.data;
    return data;
  },
  unsavePost: async (postId: string): Promise<PostType> => {
    const response = await axiosInstance.delete(API.POSTS.SAVE_POST(postId));
    const { data } = response.data;
    return data;
  },
  getCommentsByPostId: async ({
    pageParam = 1,
    postId,
  }: {
    pageParam: number;
    postId: string;
  }): Promise<CommentResponse> => {
    const limit = 10;
    const offset = (pageParam - 1) * limit;
    const response = await axiosInstance.get(
      API.POSTS.COMMENTS_OF_POST(postId, limit, offset),
    );
    const { data } = response.data;
    const { comments, total, limit: limitResponse } = data;
    const totalPages = Math.ceil(total / limitResponse);
    return {
      comments,
      totalPages,
      currentPage: pageParam,
    };
  },
  getRepliesByCommentId: async ({
    pageParam = 1,
    postId,
    commentId,
  }: {
    pageParam: number;
    postId: string;
    commentId: string;
  }): Promise<ReplyResponse> => {
    const limit = 3;
    const offset = (pageParam - 1) * limit;
    const response = await axiosInstance.get(
      API.POSTS.REPLIES_OF_COMMENT(postId, commentId, limit, offset),
    );
    const { data } = response.data;
    const { replies, total, limit: limitResponse } = data;
    const totalPages = Math.ceil(total / limitResponse);
    return {
      replies,
      totalPages,
      currentPage: pageParam,
    };
  },
  createComment: async (postId: string, content: string): Promise<Comment> => {
    const response = await axiosInstance.post(
      API.POSTS.CREATE_COMMENT(postId),
      {
        content,
        parentCommentId: null,
      },
    );
    const { data } = response.data;
    return data;
  },
  createReplyComment: async (
    postId: string,
    commentId: string,
    content: string,
  ): Promise<Comment> => {
    const response = await axiosInstance.post(
      API.POSTS.CREATE_REPLY_COMMENT(postId, commentId),
      {
        content,
      },
    );
    const { data } = response.data;
    return data;
  },
  likeComment: async (postId: string, commentId: string): Promise<Comment> => {
    const response = await axiosInstance.post(
      API.POSTS.LIKE_COMMENT(postId, commentId),
    );
    const { data } = response.data;
    return data;
  },
  unlikeComment: async (
    postId: string,
    commentId: string,
  ): Promise<Comment> => {
    const response = await axiosInstance.delete(
      API.POSTS.LIKE_COMMENT(postId, commentId),
    );
    const { data } = response.data;
    return data;
  },
  deleteComment: async (postId: string, commentId: string) => {
    const response = await axiosInstance.delete(
      API.POSTS.DELETE_COMMENT(postId, commentId),
    );
    const { success } = response.data;
    return success;
  },
  getPostByUserId: async (
    userId: string,
    filter: string,
  ): Promise<PostType[]> => {
    const response = await axiosInstance.get(
      API.POSTS.POSTS_USER_ID(userId, filter),
    );
    const { data } = response.data;
    return data.posts;
  },
  getPostStatsByUserId: async (userId: string) => {
    const response = await axiosInstance.get(
      API.POSTS.POST_STATS_USER_ID(userId),
    );
    const { data } = response.data;
    return data;
  },
};
