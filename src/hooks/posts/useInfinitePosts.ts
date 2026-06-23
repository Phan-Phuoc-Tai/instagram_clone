import { CACHE } from "@/constants/cache.constant";
import { postService } from "@/services/post.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfinitePosts = () => {
  const query = useInfiniteQuery({
    queryKey: CACHE.POSTS.LIST,
    queryFn: postService.getNewsFeed,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
  });
  return {
    ...query,
    pages: query.data?.pages ?? [],
  };
};
