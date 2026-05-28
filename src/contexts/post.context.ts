import type { Post } from "@/types/post.type";
import { createContext } from "react";
type PostContextType = {
  post: Post;
};

export const PostContext = createContext<PostContextType | null>(null);
