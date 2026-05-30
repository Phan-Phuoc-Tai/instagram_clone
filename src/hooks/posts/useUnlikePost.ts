import { CACHE } from "@/constants/cache.constant";
import { postService } from "@/services/post.service";
import type { PostResponse } from "@/types/post.type";
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

export const useUnlikePost = () => {
  const queryClient = useQueryClient();
  const unlikePost = useMutation({
    mutationFn: (postId: string) => {
      return postService.unlikePost(postId);
    },
    onSuccess(data) {
      queryClient.setQueryData(
        CACHE.POSTS.LIST,
        (oldList: InfiniteData<PostResponse>) => {
          if (!oldList) {
            return [];
          }
          return {
            ...oldList,
            pages: oldList.pages.map((page) => {
              return {
                ...page,
                posts: page.posts.filter((post) => {
                  return post._id === data._id
                    ? { ...post, likes: data.likes, isLiked: false }
                    : post;
                }),
              };
            }),
          };
        },
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CACHE.POSTS.LIST });
    },
  });
  return unlikePost;
};
