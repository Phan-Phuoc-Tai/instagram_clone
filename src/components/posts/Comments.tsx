import React, { useState } from "react";
import { useCommentsByPostId } from "@/hooks/posts/comments/useCommentsByPostId";
import PostInfo from "./PostInfo";
import { formatTimePost } from "@/utils/formatTime";
import Replies from "./Replies";
import { Spinner } from "../ui/spinner";
import { Plus } from "lucide-react";
type Props = {
  postId: string;
};
export default function Comments({ postId }: Props) {
  const { pages, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCommentsByPostId(postId);
  const [ignorePageFetched, setIgnorePageFetched] = useState<number[]>([]);
  const [numberLoading, setNumberLoading] = useState(0);
  const handleViewMoreComments = (index: number) => {
    fetchNextPage();
    setIgnorePageFetched([...ignorePageFetched, index]);
    setNumberLoading(index);
  };

  return (
    <>
      {pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.comments.map((comment) => {
            return (
              <div key={comment._id}>
                <div className="relative">
                  <div className="flex text-base gap-1 pt-1.75">
                    <PostInfo
                      userId={comment.userId ? comment.userId._id : "null"}
                      showFullName={false}
                      size={11}
                      position="start"
                    />
                    <div className="my-2">{comment.content}</div>
                  </div>
                  <div className="absolute bottom-1 left-14 text-(--ig-secondary-text) text-xs font-semibold flex items-center gap-3">
                    <p>{formatTimePost(comment.createdAt)}</p>
                    <div>Reply</div>
                  </div>
                </div>
                <div className="replies">
                  <Replies commentId={comment._id} postId={postId} />
                </div>
              </div>
            );
          })}

          {isFetchingNextPage && numberLoading === index ? (
            <div className="w-10 h-10 mx-auto flex items-center justify-center p-px">
              <Spinner />
            </div>
          ) : hasNextPage && !ignorePageFetched.includes(index) ? (
            <div
              className="w-10 h-10 mx-auto flex items-center justify-center p-px border rounded-full cursor-pointer"
              onClick={() => handleViewMoreComments(index)}
            >
              <Plus />
            </div>
          ) : (
            <></>
          )}
        </React.Fragment>
      ))}
    </>
  );
}
