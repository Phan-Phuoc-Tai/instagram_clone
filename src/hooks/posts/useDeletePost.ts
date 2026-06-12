import { CACHE } from "@/constants/cache.constant";
import { postService } from "@/services/post.service";
import type { PostResponse } from "@/types/post.type";
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

export const useDeletePost = (postId: string) => {
  const queryClient = useQueryClient();
  const deletePost = useMutation({
    mutationFn: () => {
      return postService.deletePost(postId);
    },
    onSuccess() {
      queryClient.setQueryData(
        CACHE.POSTS.LIST,
        (oldList: InfiniteData<PostResponse>) => {
          if (!oldList) {
            return oldList;
          }
          return {
            ...oldList,
            pages: oldList.pages.map((page: PostResponse) => {
              return {
                ...page,
                posts: page.posts.filter((post) => post._id !== postId),
              };
            }),
          };
        },
      );
    },
  });
  return deletePost;
};
