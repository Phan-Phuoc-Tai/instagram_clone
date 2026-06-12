import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import AvatarDefault from "../icons/AvatarDefault";
import ImageAndVideo from "../icons/ImageAndVideo";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { ChevronDown, MapPin, MoveLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/user.store";
import { Textarea } from "../ui/textarea";
import CollaboratorsIcon from "../icons/CollaboratorsIcon";
import { useForm } from "react-hook-form";
import { useCreatePost } from "@/hooks/posts/useCreatePost";
import { POST_CONFIG } from "@/constants/post.constant";
type Props = {
  onClose: () => void;
};
export default function CreatePost({ onClose }: Props) {
  const { user } = useUserStore();
  const chooseFileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [contentType, setContentType] = useState("");
  const [isShowCaption, setIsShowCaption] = useState(false);
  const [countCharacter, setCountCharacter] = useState(0);
  const maxCharacter = 2200;
  const { handleSubmit, register, reset } = useForm<{
    caption: string;
  }>();
  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (
      !["image/jpeg", "image/jpg", "image/png", "video/mp4"].includes(
        file!.type,
      )
    ) {
      return toast.error("File invalid");
    }
    const url = URL.createObjectURL(file!);
    setContentType(file!.type);
    setFile(file!);
    setPreviewUrl(url);
  };
  const handleOpenFolderPicture = () => {
    chooseFileRef.current?.click();
  };
  const handleBackStep = () => {
    if (isShowCaption) {
      setIsShowCaption(false);
      return;
    }
    setPreviewUrl(null);
    setFile(null);
  };
  const handleNextStep = () => {
    setIsShowCaption(true);
  };
  const handleChangeCaption = () => {
    setCountCharacter(countCharacter + 1);
  };
  const createPost = useCreatePost();
  const onSubmit = (data: { caption: string }) => {
    toast.promise(createPost.mutateAsync({ file, ...data }), {
      loading: POST_CONFIG.LOADING,
      error: POST_CONFIG.ERROR.CREATE_POST,
      success: () => {
        onClose();
        reset();
        URL.revokeObjectURL(previewUrl!);
        return POST_CONFIG.SUCCESS.CREATE_POST;
      },
    });
  };
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(previewUrl!);
    };
  }, [file, previewUrl]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "flex items-center justify-center h-224 w-181.5 mx-auto ease-in-out ",
        isShowCaption && "w-full transition-[width] duration-300",
      )}
    >
      <div
        className={cn(
          "bg-white rounded-xl w-181.5",
          isShowCaption && "w-full ",
        )}
      >
        <div className="flex items-center justify-center py-2.5 text-center border-b">
          {file && (
            <button
              type="button"
              onClick={handleBackStep}
              className="flex-1 max-w-12 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <MoveLeft />
            </button>
          )}
          <h2 className="flex-1 text-(--ig-primary-text) text-base font-semibold mr-auto">
            Create new post
          </h2>
          {file &&
            (isShowCaption ? (
              <button
                type={countCharacter > 0 ? "submit" : "button"}
                className="flex-1 max-w-16 text-(--ig-colors-link-text) font-medium cursor-pointer hover:underline"
              >
                <span>Share</span>
              </button>
            ) : (
              <button
                type="button"
                className="flex-1 max-w-16 text-(--ig-colors-link-text) font-medium cursor-pointer hover:underline"
                onClick={handleNextStep}
              >
                <span>Next</span>
              </button>
            ))}
        </div>
        <div className={"h-181.5 w-full flex justify-center "}>
          <div className="flex flex-col w-181.5 shrink-0 gap-4 items-center justify-center h-full">
            {file ? (
              <>
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
              </>
            ) : (
              <>
                <Input
                  type="file"
                  ref={chooseFileRef}
                  onChange={handleChangeFile}
                  hidden
                />
                <ImageAndVideo />
                <h3 className="text-(--ig-primary-text) text-xl font-normal">
                  Drag photos and videos here
                </h3>
                <Button
                  type="button"
                  className="bg-(--secondary-bg-button) cursor-pointer hover:bg-indigo-800 focus-visible:ring-0 border-none"
                  onClick={handleOpenFolderPicture}
                >
                  Select From Computer
                </Button>
              </>
            )}
          </div>
          <div
            className={cn(
              "opacity-0 invisible shrink-0 w-0  max-w-85 ease-in-out border-l",
              isShowCaption &&
                "opacity-100 visible w-85 transition-[width] duration-300 ",
            )}
          >
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
