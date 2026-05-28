export type Post = {
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
  likedBy: [];
  savedBy: [];
  createdAt: string;
  isLiked: boolean;
  isSaved: boolean;
};

export type PostResponse = {
  posts: Post[];
  totalPages: number;
  currentPage: number;
};
