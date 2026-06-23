import { CACHE } from "@/constants/cache.constant";
import { postService } from "@/services/post.service";
import type { CommentResponse } from "@/types/post.type";
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

export const useCreateComment = (postId: string) => {
  const queryClient = useQueryClient();
  const createComment = useMutation({
    mutationFn: (comment: string) => {
      return postService.createComment(postId, comment);
    },
    onSuccess: (data) => {
      data.replies = [];

      queryClient.setQueryData(
        CACHE.POSTS.COMMENTS(postId),
        (oldList: InfiniteData<CommentResponse>) => {
          if (!oldList) {
            return oldList;
          }
          return {
            ...oldList,
            pages: oldList.pages.map((page: CommentResponse) => {
              return {
                ...page,
                comments: [data, ...page.comments],
              };
            }),
          };
        },
      );
      queryClient.invalidateQueries({ queryKey: CACHE.POSTS.COMMENTS(postId) });
    },
  });
  return createComment;
};
