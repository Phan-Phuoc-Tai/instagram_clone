export type Conversation = {
  _id: string;
  participants: Participant[];
  lastMessageAt: string;
  createdAt: string;
  unreadCount: number;
  lastMessage: {
    _id: string;
    senderId: string;
    messageType: string;
    content: string;
    isRead: boolean;
    createdAt: string;
  };
};

export type Participant = {
  _id: string;
  username: string;
  fullName: string;
  profilePicture: string | null;
};

export type Message = {
  _id: string;
  conversationId: string;
  senderId: Participant;
  recipientId: string;
  messageType: string;
  imageUrl: string;
  content: string;
  isRead: boolean;
  createdAt: string;
};

export type ConversationResponse = {
  conversations: Conversation[];
  totalPages: number;
  currentPage: number;
};

export type MessagesResponse = {
  messages: Message[];
  totalPages: number;
  currentPage: number;
};
