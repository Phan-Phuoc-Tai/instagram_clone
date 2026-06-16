import { API } from "@/constants/config.constant";
import { axiosInstance } from "@/lib/axios";
import type {
  FollowerResponse,
  FollowingResponse,
} from "@/types/follower.type";

export const followService = {
  followUser: async (userId: string) => {
    const response = await axiosInstance.post(API.FOLLOW.FOLLOW_USER(userId));
    const { success } = response.data;
    return success;
  },
  unfollowUser: async (userId: string) => {
    const response = await axiosInstance.delete(API.FOLLOW.FOLLOW_USER(userId));
    const { success } = response.data;
    return success;
  },
  getFollowers: async ({
    pageParam = 1,
    userId,
  }: {
    pageParam: number;
    userId: string;
  }): Promise<FollowerResponse> => {
    const limit = 7;
    const page = pageParam;
    const response = await axiosInstance.get(
      API.FOLLOW.FOLLOWERS(userId, limit, page),
    );
    const { data } = response.data;
    const { pagination, followers } = data;
    const { totalPages } = pagination;
    return {
      followers,
      totalPages,
      currentPage: pageParam,
    };
  },
  getFollowing: async ({
    pageParam = 1,
    userId,
  }: {
    pageParam: number;
    userId: string;
  }): Promise<FollowingResponse> => {
    const limit = 7;
    const page = pageParam;
    const response = await axiosInstance.get(
      API.FOLLOW.FOLLOWING(userId, limit, page),
    );
    const { data } = response.data;
    const { pagination, following } = data;
    const { totalPages } = pagination;
    return {
      following,
      totalPages,
      currentPage: pageParam,
    };
  },
};
