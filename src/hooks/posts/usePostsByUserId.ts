import { CACHE } from "@/constants/cache.constant";
import { postService } from "@/services/post.service";
import { useQuery } from "@tanstack/react-query";

export const usePostsByUserId = (userId: string, filter: string) => {
  const query = useQuery({
    queryKey: CACHE.POSTS.LIST_OF_USER_ID(userId),
    queryFn: () => postService.getPostByUserId(userId, filter),
  });
  return {
    ...query,
  };
};
