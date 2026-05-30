import { CACHE } from "@/constants/cache.constant";
import { postService } from "@/services/post.service";
import type { Post } from "@/types/post.type";
import { useQuery } from "@tanstack/react-query";

export const usePostById = (postId: string) => {
  const query = useQuery({
    queryKey: CACHE.POSTS.DETAIL(postId),
    queryFn: () => postService.getPostById(postId),
  });
  return {
    ...query,
    post: query.data ?? ({} as Post),
  };
};
