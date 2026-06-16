import { usePostById } from "@/hooks/posts/usePostById";
import PostInfo from "./PostInfo";
import { formatTimePost } from "@/utils/formatTime";
import { Bookmark, Heart, MessageCircle, Repeat, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useLikePost } from "@/hooks/posts/useLikePost";
import { useUnlikePost } from "@/hooks/posts/useUnlikePost";
import { useSavePost } from "@/hooks/posts/useSavePost";
import { useUnsavePost } from "@/hooks/posts/useUnsavePost";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import CommandCustom from "../modals/CommandCustom";
import { useCommentsByPostId } from "@/hooks/posts/comments/useCommentsByPostId";
import { useForm } from "react-hook-form";
import { useCreateComment } from "@/hooks/posts/comments/useCreateComment";
import { PostContext } from "@/contexts/post.context";
import { useCreateReplyComment } from "@/hooks/posts/comments/useCreateReplyComment";
import Comments from "./comments/Comments";
import PostDetailOption from "./PostDetailOption";
type Props = {
  postId: string;
};
export default function PostDetail({ postId }: Props) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { post } = usePostById(postId);
  const { _id, userId, caption, image, video, mediaType, createdAt } = post;
  const { status } = useCommentsByPostId(_id);
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [isOpenPostDetailOption, setIsOpenPostDetailOption] = useState(false);
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
  const createComment = useCreateComment(_id);
  const createReplyComment = useCreateReplyComment(_id);
  const { handleSubmit, register, reset, setValue, setFocus } = useForm<{
    content: string;
  }>();
  const [isReply, setIsReply] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [userComment, setUserComment] = useState("");
  const onSubmit = (data: { content: string }) => {
    if (!isReply) {
      createComment.mutate(data.content);
      reset();
      return;
    }
    const content = data.content.slice(data.content.indexOf(" ") + 1);
    createReplyComment.mutate({ commentId, content });
    setIsReply(false);
    setCommentId("");
    setUserComment("");
    reset();
  };
  const handleClosePostDetailOption = () => {
    setIsOpenPostDetailOption(false);
  };
  const handleOpenPostDetailOption = () => {
    setIsOpenPostDetailOption(true);
  };
  useEffect(() => {
    if (isReply) {
      setValue("content", `@${userComment} `);
      setFocus("content", {
        shouldSelect: false,
      });
    }
  }, [isReply, setValue, setFocus, userComment]);
  return (
    <>
      {status === "pending" ? (
        <div className="bg-white h-[95vh] w-full"></div>
      ) : (
        <div className="flex bg-white rounded-r-sm">
          <div className="h-[95vh] w-full flex items-center justify-center bg-black/80 ">
            {mediaType === "image" ? (
              <img
                src={image ? `${BASE_URL}${image}` : `${BASE_URL}/null`}
                className="w-full object-contain text-(--ig-secondary-text)"
              />
            ) : (
              <video
                src={video ? `${BASE_URL}${video}` : `${BASE_URL}/null`}
                className="w-full object-contain"
                muted
                loop
                autoPlay
                controls
              />
            )}
          </div>
          <div className="max-w-125 w-full flex flex-col">
            <div className="info flex items-center justify-between gap-1 border-b pr-2">
              <div className="pl-4 py-1.5 pr-1">
                <PostInfo
                  userId={userId ? userId._id : "null"}
                  showFullName={true}
                  size={11}
                  position="center"
                />
              </div>
              <button
                className="w-10 h-10 p-2 flex items-center justify-center gap-0.5"
                onClick={handleOpenPostDetailOption}
              >
                <span className="w-0.75 h-0.75 rounded-full bg-(--ig-secondary-text) "></span>
                <span className="w-0.75 h-0.75 rounded-full bg-(--ig-secondary-text) "></span>
                <span className="w-0.75 h-0.75 rounded-full bg-(--ig-secondary-text) "></span>
              </button>
            </div>
            <ScrollArea className="caption&comment max-h-166.5 p-4 flex-4">
              <div className="relative">
                <div className="flex text-base gap-1">
                  <PostInfo
                    userId={userId ? userId._id : "null"}
                    showFullName={false}
                    size={11}
                    position="start"
                  />
                  <div className="my-2">{caption}</div>
                </div>
                <div className="absolute bottom-1 left-14 text-(--ig-secondary-text) text-xs">
                  {formatTimePost(createdAt)}
                </div>
              </div>
              <PostContext
                value={{
                  setIsReply,
                  setCommentId,
                  setUserComment,
                  postId: _id,
                }}
              >
                <Comments postId={_id} />
              </PostContext>
            </ScrollArea>
            <div className="action flex-1 grow ">
              <div className="px-4 border-t">
                <div className="reaction  flex items-center justify-between  pt-1.5 pb-2">
                  <div className="flex items-center gap-2">
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
                    </div>
                    <div className="comment flex items-center -ml-2">
                      <p className="p-2">
                        <MessageCircle className="cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out" />
                      </p>
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
                <div className="mb-4">
                  {likes! > 0 ? (
                    <p className=" text-(--ig-primary-text) text-sm font-medium cursor-pointer hover:underline">
                      {likes} {likes > 1 ? "likes" : "like"}
                    </p>
                  ) : (
                    <p className=" text-(--ig-primary-text) text-sm cursor-pointer">
                      <span>Be the first to </span>
                      <span
                        className="font-medium  hover:underline"
                        onClick={handleLikePost}
                      >
                        like this
                      </span>
                    </p>
                  )}
                  <p className="text-(--ig-secondary-text) text-xs">
                    {formatTimePost(createdAt)}
                  </p>
                </div>
              </div>
              <form
                className="flex grow items-center justify-between px-4 py-2.5 border-t "
                onSubmit={handleSubmit(onSubmit)}
              >
                <Textarea
                  autoComplete="off"
                  autoCorrect="off"
                  className="focus-visible:ring-0 border-0 outline-0 flex-1 appearance-none text-sm max-h-20 max-w-full overflow-auto min-h-4.5 px-0 py-0 rounded-none"
                  placeholder="Add a comment..."
                  {...register("content")}
                />
                <Button className="ml-2 px-0  text-(--ig-colors-link-text) bg-white hover:bg-transparent cursor-pointer hover:underline">
                  Post
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
      {isOpenPostDetailOption && (
        <CommandCustom
          open={isOpenPostDetailOption}
          onClose={handleClosePostDetailOption}
          widthContent="sm:max-w-140 max-w-full w-full bg-none"
          showCloseBtn={false}
        >
          <PostDetailOption
            userId={userId && userId._id}
            postId={postId}
            onClose={handleClosePostDetailOption}
          />
        </CommandCustom>
      )}
    </>
  );
}
