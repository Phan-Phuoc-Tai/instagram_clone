import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { POST_CONFIG } from "@/constants/post.constant";
import { useDeletePost } from "@/hooks/posts/useDeletePost";
import { useUserStore } from "@/stores/user.store";
import { toast } from "sonner";
type Props = {
  isFollowing: boolean;
  userId: string;
  postId: string;
};
export default function PostOptions({ isFollowing, userId, postId }: Props) {
  const { user } = useUserStore();
  const isOwner = user._id === userId;
  const deletePost = useDeletePost(postId);
  const handleDeletePost = () => {
    toast.promise(deletePost.mutateAsync(), {
      loading: POST_CONFIG.LOADING,
      error: POST_CONFIG.ERROR.DELETE_POST,
      success: POST_CONFIG.SUCCESS.DELETE_POST,
    });
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
              <DropdownMenuItem className="p-4 cursor-pointer">
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                className="p-4 cursor-pointer"
                onClick={handleDeletePost}
              >
                Delete
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem
                variant="destructive"
                className="p-4 cursor-not-allowed"
              >
                Report
              </DropdownMenuItem>
              <DropdownMenuItem
                variant={isFollowing ? "destructive" : "default"}
                className="p-4 cursor-not-allowed"
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
