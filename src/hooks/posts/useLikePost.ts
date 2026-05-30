import { CACHE } from "@/constants/cache.constant";
import { postService } from "@/services/post.service";
import type { PostResponse } from "@/types/post.type";
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

export const useLikePost = () => {
  const queryClient = useQueryClient();
  const likePost = useMutation({
    mutationFn: (postId: string) => {
      return postService.likePost(postId);
    },

    onSuccess: (data) => {
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
                posts: page.posts.filter((post) => {
                  return post._id === data._id
                    ? { ...post, isLiked: true, likes: data.likes }
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
  return likePost;
};
