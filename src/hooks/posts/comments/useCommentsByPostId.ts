import { CACHE } from "@/constants/cache.constant";
import { postService } from "@/services/post.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useCommentsByPostId = (postId: string) => {
  const query = useInfiniteQuery({
    queryKey: CACHE.POSTS.COMMENTS_OF_POST(postId),
    queryFn: ({ pageParam }) =>
      postService.getCommentsByPostId({ pageParam, postId }),
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
