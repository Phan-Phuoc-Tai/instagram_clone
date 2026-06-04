import React from "react";
import { useCommentsByPostId } from "@/hooks/posts/comments/useCommentsByPostId";
import { Spinner } from "../ui/spinner";
import { Plus } from "lucide-react";

import Comment from "./Comment";
type Props = {
  postId: string;
};
export default function Comments({ postId }: Props) {
  const { pages, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCommentsByPostId(postId);
  const handleViewMoreComments = () => {
    fetchNextPage();
  };

  return (
    <>
      {pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.comments.map((comment) => {
            return <Comment comment={comment} key={comment._id} />;
          })}
        </React.Fragment>
      ))}
      {isFetchingNextPage ? (
        <div className="w-10 h-10 mx-auto flex items-center justify-center p-px">
          <Spinner />
        </div>
      ) : hasNextPage ? (
        <div
          className="w-10 h-10 mx-auto flex items-center justify-center p-px border rounded-full cursor-pointer"
          onClick={handleViewMoreComments}
        >
          <Plus />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
