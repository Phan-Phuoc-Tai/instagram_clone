import type { PostType } from "@/types/post.type";
import { Heart, MessageCircle } from "lucide-react";
import PostDetail from "../posts/PostDetail";
import CommandCustom from "../modals/CommandCustom";
import { useState } from "react";
type Props = {
  post: PostType;
};
export default function Post({ post }: Props) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [isOpenPostDetail, setIsOpenPostDetail] = useState(false);
  return (
    <>
      <article className="col-span-3 h-[40vh] relative group">
        <div className="h-full">
          {post.mediaType === "image" ? (
            <img
              src={`${BASE_URL}${post.image}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={`${BASE_URL}${post.video}`}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div
          onClick={() => setIsOpenPostDetail(true)}
          className=" hidden h-full bg-black/65 absolute inset-0 text-white group-hover:flex items-center justify-center gap-5 cursor-pointer"
        >
          <p className="flex items-center gap-2 font-bold text-base">
            <Heart />
            <span>{post.likes}</span>
          </p>
          <p className="flex items-center gap-2 font-bold text-base">
            <MessageCircle />
            <span>{post.comments}</span>
          </p>
        </div>
      </article>
      {isOpenPostDetail && (
        <CommandCustom
          open={isOpenPostDetail}
          onClose={() => setIsOpenPostDetail(false)}
          widthContent="rounded-none! sm:max-w-305 top-6 max-w-full w-full bg-none"
          showCloseBtn={true}
        >
          <PostDetail postId={post._id} />
        </CommandCustom>
      )}
    </>
  );
}
