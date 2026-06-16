import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import AvatarDefault from "../icons/AvatarDefault";
import { toast } from "sonner";
import { ChevronDown, MapPin } from "lucide-react";
import { useUserStore } from "@/stores/user.store";
import { Textarea } from "../ui/textarea";
import CollaboratorsIcon from "../icons/CollaboratorsIcon";
import { useForm } from "react-hook-form";

import { usePostById } from "@/hooks/posts/usePostById";
import { useUpdatePost } from "@/hooks/posts/useUpdatePost";
import { POST_CONFIG } from "@/constants/post.constant";
import { Spinner } from "../ui/spinner";
type Props = {
  onClose: () => void;
  postId: string;
};
export default function UpdatePost({ onClose, postId }: Props) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { user } = useUserStore();
  const { post } = usePostById(postId);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [contentType, setContentType] = useState("");
  const [countCharacter, setCountCharacter] = useState(post.caption.length);
  const [isLoading, setIsLoading] = useState(false);
  const maxCharacter = 2200;
  const { handleSubmit, register, reset, setValue, setFocus } = useForm<{
    caption: string;
  }>();
  const handleChangeCaption = () => {
    setCountCharacter(countCharacter + 1);
  };
  const updatePost = useUpdatePost(postId);
  const onSubmit = (data: { caption: string }) => {
    const { caption } = data;

    toast.promise(
      () => {
        setIsLoading(true);
        return updatePost.mutateAsync(caption);
      },
      {
        loading: POST_CONFIG.LOADING,
        error() {
          setIsLoading(false);
          return POST_CONFIG.ERROR.UPDATE_POST;
        },
        success() {
          setIsLoading(false);
          onClose();
          reset();
          return POST_CONFIG.SUCCESS.UPDATE_POST;
        },
      },
    );
  };
  useEffect(() => {
    const handleSetValue = () => {
      setContentType(post.mediaType);
      setPreviewUrl(
        post.mediaType.includes("image")
          ? `${BASE_URL}${post.image}`
          : `${BASE_URL}${post.video}`,
      );
      setValue("caption", post.caption);
      setFocus("caption", {
        shouldSelect: false,
      });
    };
    handleSetValue();
  }, [post]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-center h-224 w-full transition-[width] duration-300 mx-auto ease-in-out "
    >
      <div className={"bg-white rounded-xl w-full"}>
        <div className="flex items-center justify-center py-2.5 text-center border-b">
          <button
            type={"button"}
            className="flex-1 max-w-16 text-(--ig-secondary-text) font-medium cursor-pointer hover:underline"
            onClick={onClose}
          >
            <span>Cancel</span>
          </button>
          <h2 className="flex-1 text-(--ig-primary-text) text-base font-semibold mr-auto">
            Edit post
          </h2>
          {isLoading ? (
            <div className="w-16 flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <button
              type={countCharacter > 0 ? "submit" : "button"}
              className="flex-1 max-w-16 text-(--ig-colors-link-text) font-medium cursor-pointer hover:underline"
            >
              <span>Share</span>
            </button>
          )}
        </div>
        <div className={"h-181.5 w-full flex justify-center "}>
          <div className="flex flex-col w-181.5 shrink-0 gap-4 items-center justify-center h-full">
            {contentType.includes("image") ? (
              <img src={previewUrl!} className="w-full object-contain " />
            ) : (
              <video
                src={previewUrl!}
                className="w-full object-contain "
                muted
                loop
                autoPlay
                controls
              />
            )}
          </div>
          <div className="w-85 transition-[width] duration-300 ease-in-out border-l">
            <div className="px-4 pt-4.5 border-b">
              <div className="flex items-center gap-3 ">
                <Avatar className="flex items-center justify-center size-7">
                  <AvatarImage src={user.profilePicture!} />
                  <AvatarFallback asChild>
                    <div className="p-1 border bg-white">
                      <AvatarDefault width="26px" height="26px" />
                    </div>
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-(--ig-primary-text) text-sm font-medium">
                  {user.username}
                </h3>
              </div>
              <Textarea
                autoComplete="off"
                autoCorrect="off"
                className="focus-visible:ring-0 border-0 outline-0 flex-1 appearance-none text-sm max-h-20 max-w-full overflow-auto min-h-42 px-0 py-0 rounded-none mt-3.5"
                onInput={handleChangeCaption}
                {...register("caption")}
              />
              <div className="text-[#C7C7C7] text-xs text-right font-normal py-3.5 ">
                <span>{countCharacter}</span>
                <span>/</span>
                <span>{maxCharacter.toLocaleString()}</span>
              </div>
            </div>
            <ul className="px-4 border-b cursor-not-allowed">
              <li className="flex items-center justify-between text-base font-normal py-3.5">
                <span className="text-(--ig-secondary-text)">Add location</span>
                <MapPin
                  style={{
                    width: 18,
                    height: 18,
                  }}
                />
              </li>
              <li className="flex items-center justify-between text-base font-normal py-3.5">
                <span className="text-(--ig-secondary-text)">
                  Add collaborators
                </span>
                <CollaboratorsIcon />
              </li>
              <li className="flex items-center justify-between text-base font-normal py-3.5">
                <span className="text-(--ig-primary-text)">Share to</span>
                <ChevronDown
                  style={{
                    width: 22,
                    height: 22,
                  }}
                />
              </li>
              <li className="flex items-center justify-between text-base font-normal py-3.5">
                <span className="text-(--ig-primary-text)">Accessibility</span>
                <ChevronDown
                  style={{
                    width: 22,
                    height: 22,
                  }}
                />
              </li>
              <li className="flex items-center justify-between text-base font-normal py-3.5">
                <span className="text-(--ig-primary-text)">
                  Advanced Settings
                </span>
                <ChevronDown
                  style={{
                    width: 22,
                    height: 22,
                  }}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
}
