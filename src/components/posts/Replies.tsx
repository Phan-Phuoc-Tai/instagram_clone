import { useRepliesByCommentId } from "@/hooks/posts/comments/useRepliesByCommentId";
import { formatTimePost } from "@/utils/formatTime";
import React, { useState } from "react";
import PostInfo from "./PostInfo";
import { Spinner } from "../ui/spinner";
type Props = {
  commentId: string;
  postId: string;
};
export default function Replies({ commentId, postId }: Props) {
  const { pages, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useRepliesByCommentId(postId, commentId);
  const [isShowReplies, setIsShowReplies] = useState(false);
  const [ignorePageFetched, setIgnorePageFetched] = useState<number[]>([]);
  const [numberLoading, setNumberLoading] = useState(0);
  const handleViewMoreRepliesComment = (index: number) => {
    fetchNextPage();
    setIgnorePageFetched([...ignorePageFetched, index]);
    setNumberLoading(index);
  };
  const handleHideReplies = () => {
    setIsShowReplies(false);
  };

  return (
    <>
      {!isShowReplies && pages[0]?.replies.length > 0 ? (
        <div
          className="flex items-center gap-3 ml-14 cursor-pointer hover:underline"
          onClick={() => setIsShowReplies(true)}
        >
          <p className="w-6 h-px bg-(--ig-secondary-text)"></p>
          <p className="text-(--ig-secondary-text) text-xs">View replies</p>
        </div>
      ) : (
        pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.replies.map((reply) => (
              <div key={reply._id} className="relative ml-13.5">
                <div className="flex text-base gap-1 pt-1.75">
                  <PostInfo
                    userId={reply.userId ? reply.userId._id : "null"}
                    showFullName={false}
                    size={11}
                    position="start"
                  />
                  <div className="my-2">{reply.content}</div>
                </div>
                <div className="absolute bottom-1 left-14 text-(--ig-secondary-text) text-xs font-semibold flex items-center gap-3">
                  <p>{formatTimePost(reply.createdAt)}</p>
                  <div>Reply</div>
                </div>
              </div>
            ))}

            {isFetchingNextPage && numberLoading === index ? (
              <div className="w-10 h-10 mx-auto flex items-center justify-center p-px">
                <Spinner />
              </div>
            ) : hasNextPage && !ignorePageFetched.includes(index) ? (
              <div
                className="flex items-center gap-3 ml-28 cursor-pointer hover:underline"
                onClick={() => handleViewMoreRepliesComment(index)}
              >
                <p className="w-6 h-px bg-(--ig-secondary-text)"></p>
                <p className="text-(--ig-secondary-text) text-xs">
                  View more replies
                </p>
              </div>
            ) : page.replies.length > 0 &&
              !ignorePageFetched.includes(index) ? (
              <div className="flex items-center gap-3 ml-28 cursor-pointer hover:underline">
                <p className="w-6 h-px bg-(--ig-secondary-text)"></p>
                <p
                  className="text-(--ig-secondary-text) text-xs"
                  onClick={handleHideReplies}
                >
                  Hide replies
                </p>
              </div>
            ) : (
              <></>
            )}
          </React.Fragment>
        ))
      )}
    </>
  );
}
