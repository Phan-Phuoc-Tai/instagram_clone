import Conversation from "@/components/message/Conversation";
import Intro from "@/components/message/Intro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MESSAGE_CONFIG } from "@/constants/message.constant";
import { useConversations } from "@/hooks/messages/useConversations";
import { useUserStore } from "@/stores/user.store";
import { Edit, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useState } from "react";
import ConversationLoading from "@/components/loading/ConversationLoading";
import { Spinner } from "@/components/ui/spinner";
import ConversationSpace from "@/components/message/ConversationSpace";
import { ConversationContext } from "@/contexts/conversation.context";
import type { Participant } from "@/types/message.type";
export default function MessagePage() {
  const { user } = useUserStore();
  const { pages, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useConversations();
  const { ref, inView } = useInView({});
  const [conversationId, setConversationId] = useState("");
  const [participant, setParticipant] = useState({} as Participant);
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  return (
    <div className="ml-18 flex ">
      <ConversationContext.Provider
        value={{
          conversationId,
          setConversationId,
          participant,
          setParticipant,
        }}
      >
        <div className="left max-w-100 w-full border-r flex flex-col h-screen ">
          <div className="flex items-center justify-between px-6 pt-9 pb-3 text-(--ig-primary-text) font-bold text-xl leading-6.25">
            <h2>{user.username}</h2>
            <Button
              variant={"outline"}
              className="border-0 cursor-pointer rounded-lg hover:bg-transparent hover:scale-105 h-auto transition-transform duration-400"
            >
              <Edit
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </Button>
          </div>
          <div className="px-4">
            <label
              htmlFor="search"
              className=" bg-[#f3f5f7] border rounded-full h-10 px-4 flex items-center"
            >
              <Search
                className="text-(--ig-secondary-text)"
                style={{
                  width: 20,
                  height: 20,
                }}
              />
              <Input
                id="search"
                placeholder="Search"
                className="focus-visible:ring-0 h-full rounded-none border-0 px-4 text-base placeholder:text-base"
              />
            </label>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center px-6 pt-4 pb-2 ">
              <h1 className="text-(--ig-primary-text) font-bold">
                {MESSAGE_CONFIG.MESSAGES}
              </h1>
              <h4 className="text-(--ig-secondary-text) font-medium cursor-not-allowed hover:underline">
                {MESSAGE_CONFIG.REQUEST}
              </h4>
            </div>
            <div>
              <ScrollArea className="flex-1 py-2 max-h-196 h-full">
                {status === "pending" &&
                  Array.from({ length: 5 }).map((_, index) => (
                    <div className="px-6 py-2" key={index}>
                      <ConversationLoading />
                    </div>
                  ))}
                {pages.map((page, index) => (
                  <React.Fragment key={index}>
                    {page.conversations.map((conversation) => (
                      <Conversation
                        conversation={conversation}
                        key={conversation._id}
                      />
                    ))}
                  </React.Fragment>
                ))}
                <div ref={ref}>
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
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
        <div className="right flex-1">
          {conversationId !== "" ? (
            <ConversationSpace />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Intro />
            </div>
          )}
        </div>
      </ConversationContext.Provider>
    </div>
  );
}
