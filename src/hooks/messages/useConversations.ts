import { CACHE } from "@/constants/cache.constant";
import { messageService } from "@/services/message.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useConversations = () => {
  const query = useInfiniteQuery({
    queryKey: CACHE.MESSAGES.CONVERSATIONS,
    queryFn: ({ pageParam }) => messageService.getConversations(pageParam),
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
