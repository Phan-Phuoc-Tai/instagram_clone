import type { Message } from "@/types/message.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarDefault from "../icons/AvatarDefault";
import { useUserStore } from "@/stores/user.store";
import { cn } from "@/lib/utils";
type Props = {
  message: Message;
};
export default function Message({ message }: Props) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { user } = useUserStore();
  const { senderId } = message;
  const isOwner = user._id === senderId?._id;
  return (
    <div className={cn("flex justify-start", isOwner && "justify-end")}>
      <div className="flex items-center gap-2">
        {!isOwner ? (
          <Avatar className="flex items-center justify-center size-7">
            <AvatarImage
              src={
                senderId?.profilePicture
                  ? `${BASE_URL}${senderId.profilePicture}`
                  : `${BASE_URL}/null`
              }
            />
            <AvatarFallback asChild>
              <div className="p-1 border bg-white">
                <AvatarDefault width="26px" height="26px" />
              </div>
            </AvatarFallback>
          </Avatar>
        ) : (
          ""
        )}
        {message.content && (
          <p
            className={cn(
              "bg-(--ig-secondary-bg-message) px-3 py-2 rounded-xl my-0.5 text-[15px] leading-4",
              isOwner && "bg-(--ig-primary-bg-message) text-white",
            )}
          >
            {message.content}
          </p>
        )}
        {message.imageUrl && (
          <div className="max-w-80 my-0.5 rounded-xl overflow-hidden">
            <img
              src={`${BASE_URL}${message.imageUrl}`}
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}
