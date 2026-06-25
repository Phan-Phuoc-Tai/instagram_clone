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

type Participant = {
  _id: string;
  username: string;
  fullName: string;
  profilePicture: string | null;
};

export type ConversationResponse = {
  conversations: Conversation[];
  totalPages: number;
  currentPage: number;
};
