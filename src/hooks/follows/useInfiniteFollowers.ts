import { CACHE } from "@/constants/cache.constant";
import { followService } from "@/services/follow.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteFollowers = (userId: string) => {
  const query = useInfiniteQuery({
    queryKey: CACHE.FOLLOW.FOLLOWERS(userId),
    queryFn: ({ pageParam }) => {
      return followService.getFollowers({ pageParam, userId });
    },
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
