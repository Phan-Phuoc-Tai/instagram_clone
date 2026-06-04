import React, { createContext } from "react";
type PostContextType = {
  setIsReply: React.Dispatch<React.SetStateAction<boolean>>;
  setCommentId: React.Dispatch<React.SetStateAction<string>>;
  setUserComment: React.Dispatch<React.SetStateAction<string>>;
  postId: string;
};

export const PostContext = createContext<PostContextType>(
  {} as PostContextType,
);
