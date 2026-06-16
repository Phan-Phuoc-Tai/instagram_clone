import { CACHE } from "@/constants/cache.constant";
import { postService } from "@/services/post.service";
import type { PostResponse } from "@/types/post.type";
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

export const useUpdatePost = (postId: string) => {
  const queryClient = useQueryClient();
  const updatePost = useMutation({
    mutationFn: (caption: string) => {
      return postService.updatePost(postId, caption);
    },
    onSuccess(data) {
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
                posts: page.posts.filter((post) =>
                  post._id === data._id
                    ? { ...post, caption: data.caption }
                    : post,
                ),
              };
            }),
          };
        },
      );

      queryClient.invalidateQueries({ queryKey: CACHE.POSTS.DETAIL(postId) });
    },
  });
  return updatePost;
};
