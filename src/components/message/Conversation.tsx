import type { Conversation } from "@/types/message.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarDefault from "../icons/AvatarDefault";
import { useUserStore } from "@/stores/user.store";
import { formatTimeConversation } from "@/utils/formatTime";
import { use } from "react";
import { ConversationContext } from "@/contexts/conversation.context";
type Props = {
  conversation: Conversation;
};
export default function Conversation({ conversation }: Props) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { user } = useUserStore();
  const { participants, lastMessage } = conversation;
  const participant = participants.find(
    (participant) => participant._id !== user._id,
  );
  const participantUnknown = {
    fullname: "Account has been deleted",
  };
  const { setConversationId, setParticipant } = use(ConversationContext);
  const isOwnerSender = lastMessage && user._id === lastMessage.senderId;
  const handleSetConversation = () => {
    setConversationId(conversation._id);
    setParticipant(participant!);
  };
  return (
    <div
      onClick={handleSetConversation}
      className="flex items-center gap-3 px-6 py-2 cursor-pointer hover:bg-[#f3f5f7] rounded-lg"
    >
      <Avatar className="flex items-center justify-center size-14">
        <AvatarImage
          src={
            participant?.profilePicture
              ? `${BASE_URL}${participant.profilePicture}`
              : `${BASE_URL}/null`
          }
        />
        <AvatarFallback asChild>
          <div className="p-1 border bg-white">
            <AvatarDefault width="26px" height="26px" />
          </div>
        </AvatarFallback>
      </Avatar>
      <div className="mr-auto">
        <p className="text-(--ig-primary-text) text-sm font-medium truncate w-full ">
          {participant?.fullName
            ? participant.fullName
            : participantUnknown.fullname}
        </p>
        <div className="flex items-center gap-1 text-(--ig-secondary-text) text-xs">
          <p>
            {isOwnerSender && <span>You: </span>}
            <span>
              {lastMessage?.content
                ? lastMessage?.content
                : "Start a conversation"}
            </span>
          </p>
          {lastMessage?.content && (
            <>
              <p className="w-0.75 h-0.75 rounded-full bg-(--ig-secondary-text) "></p>
              <p className="text-(--ig-secondary-text) font-normal">
                {formatTimeConversation(lastMessage.createdAt)}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
