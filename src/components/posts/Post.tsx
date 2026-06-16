import { Bookmark, Heart, MessageCircle, Repeat, Send } from "lucide-react";
import { useEffect, useState } from "react";
import type { Post } from "@/types/post.type";
import { cn } from "@/lib/utils";
import PostInfo from "./PostInfo";
import Modal from "../modals/Modal";
import CommandCustom from "../modals/CommandCustom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserById } from "@/hooks/users/useUserById";
import { formatTimePost } from "@/utils/formatTime";
import { useLikePost } from "@/hooks/posts/useLikePost";
import { useUnlikePost } from "@/hooks/posts/useUnlikePost";
import { useSavePost } from "@/hooks/posts/useSavePost";
import { useUnsavePost } from "@/hooks/posts/useUnsavePost";
import LikeBy from "./LikeBy";
import PostDetail from "./PostDetail";
import { usePostById } from "@/hooks/posts/usePostById";
import PostOption from "./PostOption";
type Props = {
  postId: string;
};
export default function Post({ postId }: Props) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { post } = usePostById(postId);
  const {
    _id,
    userId,
    image,
    totalComments,
    video,
    mediaType,
    likedBy,
    createdAt,
  } = post;
  const { user, isLoading } = useUserById(userId?._id);
  const [caption, setCaption] = useState(post.caption);
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [isOpenLikeBy, setIsOpenLikeBy] = useState(false);
  const [isOpenPostDetail, setIsOpenPostDetail] = useState(false);
  const likePost = useLikePost();
  const unlikePost = useUnlikePost();
  const savePost = useSavePost();
  const unsavePost = useUnsavePost();

  const handleLikePost = async () => {
    const result = await likePost.mutateAsync(_id);
    setLikes(result.likes);
    setIsLiked(result.isLiked);
  };
  const handleUnlikePost = async () => {
    const result = await unlikePost.mutateAsync(_id);
    setLikes(result.likes);
    setIsLiked(result.isLiked);
  };
  const handleSavePost = async () => {
    const result = await savePost.mutateAsync(_id);
    setIsSaved(result.isSaved);
  };
  const handleUnsavePost = async () => {
    const result = await unsavePost.mutateAsync(_id);
    setIsSaved(result.isSaved);
  };
  useEffect(() => {
    setLikes(post.likes);
    setIsLiked(post.isLiked);
    setIsSaved(post.isSaved);
    setCaption(post.caption);
  }, [post]);

  return (
    <>
      <article className="max-w-117.5 w-full pb-4 mb-5">
        <div className="flex items-center justify-between gap-1 pl-3.5 pr-2.5 pb-3">
          <PostInfo
            userId={userId ? userId._id : "null"}
            size={8}
            position="center"
          />
          <div className="mr-auto flex items-center gap-1 text-sm">
            <span className="block w-0.75 h-0.75 rounded-full bg-(--ig-secondary-text) "></span>
            <span className="text-(--ig-secondary-text) font-normal">
              {formatTimePost(createdAt)}
            </span>
          </div>
          <PostOption
            isFollowing={user.isFollowing}
            userId={userId && userId._id}
            postId={_id}
          />
        </div>
        <div className="image w-117 ">
          {mediaType === "image" ? (
            <img
              src={image ? `${BASE_URL}${image}` : `${BASE_URL}/null`}
              className="min-h-48 w-full object-cover rounded-sm text-(--ig-secondary-text)"
              alt={`Image's ${user.username}`}
            />
          ) : (
            <video
              src={video ? `${BASE_URL}${video}` : `${BASE_URL}/null`}
              className="min-h-48 w-full object-cover rounded-sm"
              muted
              loop
              autoPlay
              controls
            />
          )}
        </div>
        <div className="reaction px-3 flex items-center justify-between">
          <div className="my-1 flex items-center gap-2">
            <div className="like flex items-center -ml-2">
              <p
                className="p-2"
                onClick={isLiked ? handleUnlikePost : handleLikePost}
              >
                <Heart
                  className={cn(
                    "fill-transparent cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out",
                    isLiked && "fill-red-600 text-red-600",
                  )}
                />
              </p>
              {likes! > 0 && (
                <span
                  className="-ml-0.5 mr-1 text-(--ig-primary-text) text-sm font-medium cursor-pointer"
                  onClick={() => setIsOpenLikeBy(true)}
                >
                  {likes}
                </span>
              )}
            </div>
            <div className="comment flex items-center -ml-2">
              <p className="p-2" onClick={() => setIsOpenPostDetail(true)}>
                <MessageCircle className="cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out" />
              </p>
              {totalComments! > 0 && (
                <span
                  className="-ml-0.5 mr-1 text-(--ig-primary-text) text-sm font-medium cursor-pointer"
                  onClick={() => setIsOpenPostDetail(true)}
                >
                  {totalComments}
                </span>
              )}
            </div>
            <div className="rePost flex items-center -ml-2">
              <p className="p-2">
                <Repeat />
              </p>
            </div>
            <div className="share -ml-2">
              <p className="p-2">
                <Send />
              </p>
            </div>
          </div>
          <div
            className="save"
            onClick={isSaved ? handleUnsavePost : handleSavePost}
          >
            <Bookmark
              className={cn(
                "fill-transparent cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out",
                isSaved && "fill-black ",
              )}
            />
          </div>
        </div>
        {!isLoading && (
          <div className="title px-3 text-sm text-(--ig-primary-text) flex items-center gap-1">
            <h3 className=" font-semibold">{user.username}</h3>
            <p className="font-normal">{caption}</p>
          </div>
        )}
      </article>
      {isOpenLikeBy && (
        <Modal
          open={isOpenLikeBy}
          onClose={() => setIsOpenLikeBy(false)}
          title="Likes"
          styleTitle="text-center"
          styleContent="sm:max-w-140 max-h-100 bg-white ring-1 ring-foreground/10"
        >
          <ScrollArea className="border-t -mx-4 px-4 max-h-86  ">
            {likedBy.map((userId, index) => (
              <LikeBy userId={userId} key={index} />
            ))}
          </ScrollArea>
        </Modal>
      )}
      {isOpenPostDetail && (
        <>
          <CommandCustom
            open={isOpenPostDetail}
            onClose={() => setIsOpenPostDetail(false)}
            widthContent="rounded-none! sm:max-w-305 top-6 max-w-full w-full bg-none"
            showCloseBtn={true}
          >
            <PostDetail postId={_id} />
          </CommandCustom>
        </>
      )}
    </>
  );
}
