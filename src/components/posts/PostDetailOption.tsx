import { POST_CONFIG } from "@/constants/post.constant";
import { useDeletePost } from "@/hooks/posts/useDeletePost";
import { useUserStore } from "@/stores/user.store";
import { useState } from "react";
import { toast } from "sonner";
import CommandCustom from "../modals/CommandCustom";
import UpdatePost from "./UpdatePost";
type Props = {
  userId: string;
  postId: string;
  onClose: () => void;
};
export default function PostDetailOption({ userId, postId, onClose }: Props) {
  const { user } = useUserStore();
  const isOwner = user._id === userId;
  const deletePost = useDeletePost(postId);
  const [isOpenEditPost, setIsOpenEditPost] = useState(false);
  const handleDeletePost = () => {
    toast.promise(deletePost.mutateAsync(), {
      loading: POST_CONFIG.LOADING,
      error: POST_CONFIG.ERROR.DELETE_POST,
      success: POST_CONFIG.SUCCESS.DELETE_POST,
    });
  };
  const handleCloseEditPost = () => {
    setIsOpenEditPost(false);
  };
  const handleOpenEditPost = () => {
    setIsOpenEditPost(true);
  };
  return (
    <>
      <ul className="w-140 py-2 px-0 bg-white rounded-2xl text-center overflow-hidden border ">
        {isOwner ? (
          <>
            <li
              className="block p-4 cursor-pointer hover:bg-gray-100"
              onClick={handleOpenEditPost}
            >
              {POST_CONFIG.OWNER.OPTION_EDIT}
            </li>
            <li
              className="p-4 cursor-pointer text-red-500 hover:bg-red-100"
              onClick={handleDeletePost}
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
      {isOpenEditPost && (
        <CommandCustom
          open={isOpenEditPost}
          onClose={handleCloseEditPost}
          widthContent="sm:max-w-266.5 top-6 max-w-full w-full bg-none"
          showCloseBtn={false}
        >
          <UpdatePost onClose={handleCloseEditPost} postId={postId} />
        </CommandCustom>
      )}
    </>
  );
}
