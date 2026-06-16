import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { POST_CONFIG } from "@/constants/post.constant";
import { useDeletePost } from "@/hooks/posts/useDeletePost";
import { useUserStore } from "@/stores/user.store";
import { useState } from "react";
import { toast } from "sonner";
import CommandCustom from "../modals/CommandCustom";
import UpdatePost from "./UpdatePost";
type Props = {
  isFollowing: boolean;
  userId: string;
  postId: string;
};
export default function PostOption({ isFollowing, userId, postId }: Props) {
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="w-5 h-5 flex items-center justify-center gap-0.5 group cursor-pointer">
            <span className="w-0.75 h-0.75 rounded-full bg-(--ig-secondary-text) group-hover:bg-black "></span>
            <span className="w-0.75 h-0.75 rounded-full bg-(--ig-secondary-text) group-hover:bg-black"></span>
            <span className="w-0.75 h-0.75 rounded-full bg-(--ig-secondary-text) group-hover:bg-black"></span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-66.5 py-2 px-0">
          {isOwner ? (
            <>
              <DropdownMenuItem
                className="p-4 cursor-pointer"
                onClick={handleOpenEditPost}
              >
                {POST_CONFIG.OWNER.OPTION_EDIT}
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                className="p-4 cursor-pointer"
                onClick={handleDeletePost}
              >
                {POST_CONFIG.OWNER.OPTION_DELETE}
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem
                variant="destructive"
                className="p-4 cursor-not-allowed"
              >
                {POST_CONFIG.NO_OWNER.OPTION_REPORT}
              </DropdownMenuItem>
              <DropdownMenuItem
                variant={isFollowing ? "destructive" : "default"}
                className="p-4 cursor-not-allowed"
              >
                {isFollowing
                  ? POST_CONFIG.NO_OWNER.OPTION_UNFOLLOW
                  : POST_CONFIG.NO_OWNER.OPTION_FOLLOW}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
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
