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
import React from "react";
export default function MessagePage() {
  const { user } = useUserStore();
  const { pages, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useConversations();
  // const { ref, inView } = useInView({});
  return (
    <div className="ml-18 flex items-center">
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
              {pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page.conversations.map((conversation) => (
                    <Conversation
                      key={conversation._id}
                      conversation={conversation}
                    />
                  ))}
                </React.Fragment>
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>
      <div className="right flex-1">
        <Intro />
      </div>
    </div>
  );
}
