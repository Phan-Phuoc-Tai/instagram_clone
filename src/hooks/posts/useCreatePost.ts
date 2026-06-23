import { CACHE } from "@/constants/cache.constant";
import { postService } from "@/services/post.service";
import type { PostResponse } from "@/types/post.type";
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const createPost = useMutation({
    mutationFn: ({ file, caption }: { file: File | null; caption: string }) => {
      return postService.createPost(file!, caption);
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
                posts: [data, ...page.posts],
              };
            }),
          };
        },
      );
    },
  });
  return createPost;
};
