import { API } from "@/constants/config.constant";
import { axiosInstance } from "@/lib/axios";

export const postService = {
  getNewsFeed: async () => {
    const response = await axiosInstance(API.POSTS.NEWS_FEED);
    const { data } = response.data;
    return data;
  },
};
