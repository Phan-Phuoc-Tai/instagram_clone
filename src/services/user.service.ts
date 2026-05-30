import { API } from "@/constants/config.constant";
import { axiosInstance } from "@/lib/axios";
import type { User, UserById, UserSuggested } from "@/types/user.type";

export const userService = {
  profile: async (): Promise<User> => {
    const response = await axiosInstance.get(API.USER.PROFILE);
    const { data } = response.data;
    return data;
  },
  getUserById: async (id: string): Promise<UserById> => {
    const response = await axiosInstance.get(API.USER.BY_ID(id));
    const { data } = response.data;
    return data;
  },
  getSuggestedUsers: async (limit: number): Promise<UserSuggested[]> => {
    const response = await axiosInstance.get(API.USER.SUGGESTED_USERS(limit));
    const { data } = response.data;
    return data;
  },
};
