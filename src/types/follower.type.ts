export type Follower = {
  _id: string;
  username: string;
  fullName: string;
  profilePicture: string | null;
  bio: string;
};
export type FollowerResponse = {
  followers: Follower[];
  totalPages: number;
  currentPage: number;
};

export type FollowingResponse = {
  following: Follower[];
  totalPages: number;
  currentPage: number;
};
