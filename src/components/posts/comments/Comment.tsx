import type { Comment } from "@/types/post.type";
import { use, useEffect, useState } from "react";
import PostInfo from "../PostInfo";
import { PostContext } from "@/contexts/post.context";
import { useLikeComment } from "@/hooks/posts/comments/useLikeComment";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatTimePost } from "@/utils/formatTime";

import { useUserStore } from "@/stores/user.store";
import { useUnlikeComment } from "@/hooks/posts/comments/useUnlikeComment";
import Replies from "./Replies";
type Props = {
  comment: Comment;
};
export default function Comment({ comment }: Props) {
  const { setIsReply, setCommentId, setUserComment, postId } = use(PostContext);
  const { user } = useUserStore();
  const [likes, setLikes] = useState(comment.likes);
  const [isLiked, setIsLiked] = useState(comment.isLiked);
  const [isShowReplies, setIsShowReplies] = useState(false);
  const handleReplyComment = (commentId: string, userComment: string) => {
    setIsReply(true);
    setCommentId(commentId);
    setUserComment(userComment);
  };
  const likeComment = useLikeComment(postId);
  const unlikeComment = useUnlikeComment(postId);
  const handleLikeComment = async () => {
    const result = await likeComment.mutateAsync(comment._id);
    setLikes(result.likes);
    setIsLiked(result.isLiked);
  };
  const handleUnlikeComment = async () => {
    const result = await unlikeComment.mutateAsync(comment._id);
    setLikes(result.likes);
    setIsLiked(result.isLiked);
  };
  const handleShowReplies = () => {
    setIsShowReplies(true);
  };
  useEffect(() => {
    const handleSetLiked = () => {
      if (comment.likedBy.find((userId) => user._id === userId)) {
        setIsLiked(true);
      }
    };
    handleSetLiked();
  }, []);
  return (
    <div key={comment._id}>
      <div className="relative">
        <div className="flex justify-between text-base gap-1 pt-1.75">
          <PostInfo
            userId={comment.userId ? comment.userId._id : "null"}
            showFullName={false}
            size={11}
            position="start"
          />
          <div className="my-2 mr-auto">{comment.content}</div>
          <div className="like flex items-center">
            <p
              className="p-2 pr-0"
              onClick={isLiked ? handleUnlikeComment : handleLikeComment}
            >
              <Heart
                className={cn(
                  "fill-transparent cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out",
                  isLiked && "fill-red-600 text-red-600",
                )}
                style={{
                  width: 14,
                  height: 14,
                }}
              />
            </p>
          </div>
        </div>
        <div className="absolute bottom-1 left-14 text-(--ig-secondary-text) text-xs font-semibold flex items-center gap-3">
          <p>{formatTimePost(comment.createdAt)}</p>
          {likes > 0 && (
            <p>
              {likes} {likes > 1 ? "likes" : "like"}
            </p>
          )}
          <p
            className="cursor-pointer"
            onClick={() =>
              handleReplyComment(comment._id, comment.userId.username)
            }
          >
            Reply
          </p>
        </div>
      </div>
      {comment.replies.length > 0 && !isShowReplies ? (
        <div
          className="flex items-center gap-3 ml-14 cursor-pointer hover:underline"
          onClick={handleShowReplies}
        >
          <p className="w-6 h-px bg-(--ig-secondary-text)"></p>
          <p className="text-(--ig-secondary-text) text-xs">View replies</p>
        </div>
      ) : isShowReplies ? (
        <div className="replies">
          <Replies
            commentId={comment._id}
            postId={postId}
            isShowReplies={isShowReplies}
            setIsShowReplies={setIsShowReplies}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
