import { CACHE } from "@/constants/cache.constant";
import { postService } from "@/services/post.service";
import type { CommentResponse } from "@/types/post.type";
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

export const useDeleteComment = (postId: string) => {
  const queryClient = useQueryClient();
  const deleteComment = useMutation({
    mutationFn: (commentId: string) => {
      return postService.deleteComment(postId, commentId);
    },
    onSuccess() {
      queryClient.setQueryData(
        CACHE.POSTS.COMMENTS(postId),
        (oldList: InfiniteData<CommentResponse>) => {
          if (!oldList) {
            return [];
          }
          return {
            ...oldList,
            pages: oldList.pages.map((page) => {
              return {
                ...page,
                comments: page.comments.filter(
                  (comment) => comment.postId !== postId,
                ),
              };
            }),
          };
        },
      );
    },
  });
  return deleteComment;
};
