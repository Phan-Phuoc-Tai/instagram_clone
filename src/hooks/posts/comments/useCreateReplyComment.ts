import { CACHE } from "@/constants/cache.constant";
import { postService } from "@/services/post.service";
import type { ReplyResponse } from "@/types/post.type";
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

export const useCreateReplyComment = (postId: string) => {
  const queryClient = useQueryClient();
  const createComment = useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: string;
      content: string;
    }) => {
      return postService.createReplyComment(postId, commentId, content);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        CACHE.POSTS.REPLIES_OF_COMMENT(data.parentCommentId!),
        (oldList: InfiniteData<ReplyResponse>) => {
          if (!oldList) {
            return oldList;
          }
          return {
            ...oldList,
            pages: oldList.pages.map((page: ReplyResponse) => {
              return {
                ...page,
                replies: [...page.replies, data],
              };
            }),
          };
        },
      );
      queryClient.invalidateQueries({
        queryKey: CACHE.POSTS.REPLIES_OF_COMMENT(data.parentCommentId!),
      });
      queryClient.invalidateQueries({ queryKey: CACHE.POSTS.COMMENTS(postId) });
    },
  });
  return createComment;
};
