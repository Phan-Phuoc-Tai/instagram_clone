import { API } from "@/constants/config.constant";
import { axiosInstance } from "@/lib/axios";
import type { UserSearchHistory } from "@/types/user.type";

export const searchHistoryService = {
  getSearchHistory: async (): Promise<UserSearchHistory[]> => {
    const response = await axiosInstance.get(API.SEARCH_HISTORY);
    const { data } = response.data;
    return data;
  },
  addSearchHistory: async (searchedUserId: string, searchQuery: string) => {
    const response = await axiosInstance.post(API.SEARCH_HISTORY, {
      searchedUserId,
      searchQuery,
    });
    const { success } = response.data;
    return success;
  },
};
