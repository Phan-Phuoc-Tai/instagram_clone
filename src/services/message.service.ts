import { API } from "@/constants/config.constant";
import { axiosInstance } from "@/lib/axios";
import type {
  ConversationResponse,
  MessagesResponse,
} from "@/types/message.type";

export const messageService = {
  getConversations: async (
    pageParam: number,
  ): Promise<ConversationResponse> => {
    const limit = 11;
    const response = await axiosInstance.get(
      API.MESSAGES.CONVERSATIONS(pageParam, limit),
    );
    const { data } = response.data;
    const { conversations, pagination } = data;
    return {
      conversations,
      totalPages: pagination.totalPages,
      currentPage: pagination.currentPage,
    };
  },
  getMessageInConversation: async (
    conversationId: string,
    pageParam: number,
  ): Promise<MessagesResponse> => {
    const limit = 10;
    const response = await axiosInstance.get(
      API.MESSAGES.MESSAGE_IN_CONVERSATION(conversationId, pageParam, limit),
    );
    const { data } = response.data;
    const { messages, pagination } = data;
    return {
      messages,
      totalPages: pagination.totalPages,
      currentPage: pagination.currentPage,
    };
  },
};
