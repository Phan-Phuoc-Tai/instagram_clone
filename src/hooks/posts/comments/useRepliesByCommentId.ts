import { CACHE } from "@/constants/cache.constant";
import { postService } from "@/services/post.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useRepliesByCommentId = (postId: string, commentId: string) => {
  const query = useInfiniteQuery({
    queryKey: CACHE.POSTS.REPLIES_OF_COMMENT(commentId),
    queryFn: ({ pageParam }) =>
      postService.getRepliesByCommentId({ pageParam, postId, commentId }),
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
