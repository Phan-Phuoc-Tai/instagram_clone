import { CACHE } from "@/constants/cache.constant";
import { postService } from "@/services/post.service";
import type { PostResponse } from "@/types/post.type";
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

export const useUnsavePost = () => {
  const queryClient = useQueryClient();
  const unsavePost = useMutation({
    mutationFn: (postId: string) => {
      return postService.unsavePost(postId);
    },
    onSuccess(data) {
      data.isSaved = false;
      queryClient.setQueryData(
        CACHE.POSTS.LIST,
        (oldList: InfiniteData<PostResponse>) => {
          if (!oldList) {
            return [];
          }
          return {
            ...oldList,
            pages: oldList.pages.map((page: PostResponse) => {
              return {
                ...page,
                posts: page.posts.filter((post) => {
                  return post._id === data._id
                    ? { ...post, isSaved: false }
                    : post;
                }),
              };
            }),
          };
        },
      );
    },
  });
  return unsavePost;
};
