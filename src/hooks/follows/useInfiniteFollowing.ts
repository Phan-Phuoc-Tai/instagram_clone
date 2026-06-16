import { CACHE } from "@/constants/cache.constant";
import { followService } from "@/services/follow.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteFollowing = (userId: string) => {
  const query = useInfiniteQuery({
    queryKey: CACHE.FOLLOW.FOLLOWING(userId),
    queryFn: ({ pageParam }) => {
      return followService.getFollowing({ pageParam, userId });
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
