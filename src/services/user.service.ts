import { API } from "@/constants/config.constant";
import { axiosInstance } from "@/lib/axios";
import type { User } from "@/types/user.type";

export const userService = {
  profile: async (): Promise<User> => {
    const response = await axiosInstance.get(API.USER.PROFILE);
    const { data } = response.data;
    return data;
  },
  getUserById: async (id: string): Promise<User> => {
    const response = await axiosInstance.get(API.USER.BY_ID(id));
    const { data } = response.data;
    return data;
  },
  getSuggestedUsers: async (): Promise<User[]> => {
    const response = await axiosInstance.get(API.USER.SUGGESTED_USERS(5));
    const { data } = response.data;
    return data;
  },
};
