import { API } from "@/constants/config.constant";
import { axiosInstance } from "@/lib/axios";
import type {
  Comment,
  CommentResponse,
  Post,
  PostResponse,
  ReplyResponse,
} from "@/types/post.type";

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
};
