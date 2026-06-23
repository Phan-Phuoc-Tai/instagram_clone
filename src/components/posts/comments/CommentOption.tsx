import { POST_CONFIG } from "@/constants/post.constant";
import { useDeleteComment } from "@/hooks/posts/comments/useDeleteComment";
import { toast } from "sonner";

type Props = {
  isOwner: boolean;
  onClose: () => void;
  postId: string;
  commentId: string;
};
export default function CommentOption({
  isOwner,
  onClose,
  postId,
  commentId,
}: Props) {
  const deleteComment = useDeleteComment(postId);
  const handleDeleteComment = () => {
    toast.promise(deleteComment.mutateAsync(commentId), {
      loading: POST_CONFIG.LOADING,
      error: POST_CONFIG.ERROR.DELETE_COMMENT,
      success: POST_CONFIG.SUCCESS.DELETE_COMMENT,
    });
  };
  return (
    <ul className="w-140 py-2 px-0 bg-white rounded-2xl text-center overflow-hidden border ">
      {isOwner ? (
        <>
          <li
            className="p-4 cursor-pointer text-red-500 hover:bg-red-100"
            onClick={handleDeleteComment}
          >
            {POST_CONFIG.OWNER.OPTION_DELETE}
          </li>
          <li
            className="p-4 cursor-pointer hover:bg-gray-100"
            onClick={onClose}
          >
            {POST_CONFIG.BUTTON.CANCEL}
          </li>
        </>
      ) : (
        <>
          <li className="p-4 cursor-not-allowed text-red-500 hover:bg-red-100">
            {POST_CONFIG.NO_OWNER.OPTION_REPORT}
          </li>
          <li
            className="p-4 cursor-pointer hover:bg-gray-100"
            onClick={onClose}
          >
            {POST_CONFIG.BUTTON.CANCEL}
          </li>
        </>
      )}
    </ul>
  );
}
