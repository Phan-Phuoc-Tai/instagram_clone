import { API } from "@/constants/config.constant";
import { axiosInstance } from "@/lib/axios";

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
};
