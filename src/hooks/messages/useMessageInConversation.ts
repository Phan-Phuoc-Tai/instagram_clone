import { CACHE } from "@/constants/cache.constant";
import { messageService } from "@/services/message.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useMessageInConversation = (conversationId: string) => {
  const query = useInfiniteQuery({
    queryKey: CACHE.MESSAGES.MESSAGE_IN_CONVERSATION(conversationId),
    queryFn: ({ pageParam }) =>
      messageService.getMessageInConversation(conversationId, pageParam),
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
