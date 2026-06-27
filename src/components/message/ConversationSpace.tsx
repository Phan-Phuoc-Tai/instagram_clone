import { ConversationContext } from "@/contexts/conversation.context";
import { use } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarDefault from "../icons/AvatarDefault";
import { CircleAlert, Image, Phone, Video } from "lucide-react";
import { useMessageInConversation } from "@/hooks/messages/useMessageInConversation";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import Message from "./Message";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import MessageIcon from "../icons/MessageIcon";
export default function ConversationSpace() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { conversationId, participant } = use(ConversationContext);
  const participantUnknown = {
    fullname: "Account has been deleted",
  };
  const { pages } = useMessageInConversation(conversationId);

  return (
    <div className="flex flex-col h-full">
      <div className="row1 p-4 flex items-center gap-3 border-b">
        <Avatar className="flex items-center justify-center size-11">
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
            {participant ? participant.fullName : participantUnknown.fullname}
          </p>
          {participant && (
            <p className="text-(--ig-secondary-text) text-sm font-medium truncate w-full ">
              {participant.username}
            </p>
          )}
        </div>
        <div className="flex items-center ">
          <Phone className="w-10 h-10 p-2" />
          <Video className="w-10 h-10 p-2" />
          <CircleAlert className="w-10 h-10 p-2" />
        </div>
      </div>
      <div className="row2 flex-1 flex flex-col">
        <div className="flex-1">
          <ScrollArea className="py-2 px-4 max-h-197.5 h-full">
            {pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.messages.map((message) => (
                  <Message message={message} key={message._id} />
                ))}
              </React.Fragment>
            ))}
            {/* <div ref={ref}>
              {isFetchingNextPage ? (
                <div className=" w-full">
                  <ConversationLoading />
                </div>
              ) : hasNextPage ? (
                <p>
                  <Spinner />
                </p>
              ) : (
                ""
              )}
            </div> */}
          </ScrollArea>
        </div>
        <div className="grow max-h-19.5 p-4">
          <div className="flex items-center px-2.75 border rounded-full">
            <Input
              className="border-0 outline-0 focus-visible:ring-0"
              placeholder="Message..."
            />
            <div className="w-10 h-10 p-2 my-px">
              <Image />
            </div>
            <Button className="bg-(--ig-primary-bg-btn) flex items-center justify-center w-15 h-9.5 rounded-full hover:bg-(--ig-primary-bg-btn-hover) cursor-pointer">
              <MessageIcon isActive={false} className="w-auto h-auto" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
