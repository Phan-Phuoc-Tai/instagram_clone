export type PostType = {
  _id: string;
  userId: {
    _id: string;
    username: string;
  };
  caption: string;
  image: string | null;
  video: string | null;
  mediaType: string;
  likes: number;
  comments: number;
  totalComments: number;
  likedBy: [];
  savedBy: [];
  createdAt: string;
  isLiked: boolean;
  isSaved: boolean;
};

export interface CommentReply {
  _id: string;
  postId: string;
  userId: {
    _id: string;
    email: string;
    username: string;
  };
  parentCommentId: string | null;
  content: string;
  likes: number;
  likedBy: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment extends CommentReply {
  replies: CommentReply[];
  isLiked: boolean;
}

export type PostResponse = {
  posts: PostType[];
  totalPages: number;
  currentPage: number;
};

export type CommentResponse = {
  comments: Comment[];
  totalPages: number;
  currentPage: number;
};

export type ReplyResponse = {
  replies: CommentReply[];
  totalPages: number;
  currentPage: number;
};
