import type { Participant } from "@/types/message.type";
import { createContext } from "react";
type ConversationContextType = {
  conversationId: string;
  setConversationId: React.Dispatch<React.SetStateAction<string>>;
  participant: Participant;
  setParticipant: React.Dispatch<React.SetStateAction<Participant>>;
};
export const ConversationContext = createContext<ConversationContextType>(
  {} as ConversationContextType,
);
