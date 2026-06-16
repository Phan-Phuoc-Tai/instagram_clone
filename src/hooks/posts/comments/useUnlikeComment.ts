import { CACHE } from "@/constants/cache.constant";
import { postService } from "@/services/post.service";
import type { CommentResponse } from "@/types/post.type";
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

export const useUnlikeComment = (postId: string) => {
  const queryClient = useQueryClient();
  const unlikeComment = useMutation({
    mutationFn: (commentId: string) => {
      return postService.unlikeComment(postId, commentId);
    },
    onSuccess(data) {
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
                comments: page.comments.filter((comment) => {
                  return comment._id === data._id
                    ? { ...comment, likes: data.likes, isLiked: false }
                    : comment;
                }),
              };
            }),
          };
        },
      );
      queryClient.invalidateQueries({ queryKey: CACHE.POSTS.COMMENTS(postId) });
    },
  });
  return unlikeComment;
};
