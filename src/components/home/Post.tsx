import { Bookmark, Heart, MessageCircle, Repeat, Send } from "lucide-react";
import { use } from "react";
import { PostContext } from "@/contexts/post.context";
import type { Post } from "@/types/post.type";
import { cn } from "@/lib/utils";
import { useUserById } from "@/hooks/users/useUserById";
import { formatTimePost } from "@/utils/formatTime";
import PostInfo from "./PostInfo";

export default function Post() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const context = use(PostContext);
  const {
    userId,
    caption,
    image,
    video,
    mediaType,
    likes,
    comments,
    // likedBy,
    // savedBy,
    isLiked,
    isSaved,
    createdAt,
  } = context?.post as unknown as Post;
  const { user, isLoading } = useUserById(userId?._id);
  return (
    <article className="max-w-117.5 w-full pb-4 mb-5">
      <div className="flex items-center justify-between gap-1 pl-3.5 pr-2.5 pb-3">
        <PostInfo userId={userId ? userId._id : "null"} />
        <div className="mr-auto flex items-center gap-1 text-sm">
          <span className="block w-0.75 h-0.75 rounded-full bg-(--ig-secondary-text) "></span>
          <span className="text-(--ig-secondary-text) font-normal">
            {formatTimePost(createdAt)}
          </span>
        </div>
        <div className="w-5 h-5 flex items-center justify-center gap-0.5">
          <span className="w-0.75 h-0.75 rounded-full bg-(--ig-secondary-text) "></span>
          <span className="w-0.75 h-0.75 rounded-full bg-(--ig-secondary-text) "></span>
          <span className="w-0.75 h-0.75 rounded-full bg-(--ig-secondary-text) "></span>
        </div>
      </div>
      <div className="image w-117 ">
        {mediaType === "image" ? (
          <img
            src={image ? `${BASE_URL}${image}` : `${BASE_URL}/null`}
            className="w-full object-cover rounded-sm text-(--ig-secondary-text)"
            alt={`Image's ${user.username}`}
          />
        ) : (
          <video
            src={video ? `${BASE_URL}${video}` : `${BASE_URL}/null`}
            className="w-full object-cover rounded-sm"
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
            <p className="p-2">
              <Heart
                className={cn(
                  "fill-transparent cursor-pointer",
                  isLiked && "fill-red-600 text-red-600",
                )}
              />
            </p>
            <span className="-ml-0.5 mr-1 text-(--ig-primary-text) text-sm font-medium cursor-pointer">
              {likes}
            </span>
          </div>
          <div className="comment flex items-center -ml-2">
            <p className="p-2">
              <MessageCircle className="cursor-pointer" />
            </p>
            <span className="-ml-0.5 mr-1 text-(--ig-primary-text) text-sm font-medium cursor-pointer">
              {comments}
            </span>
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
        <div className="save">
          <Bookmark
            className={cn(
              "fill-transparent cursor-pointer",
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
  );
}
