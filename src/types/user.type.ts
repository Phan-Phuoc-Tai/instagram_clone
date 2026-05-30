export type User = {
  _id: string;
  email: string;
  username: string;
  fullName: string;
  profilePicture: string | null;
  bio: string;
  gender: string;
  website: string;
  isVerified: boolean;
  createdAt: string;
};

export type UserById = {
  _id: string;
  username: string;
  fullName: string;
  profilePicture: string | null;
  bio: string;
  website: string;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
  postsCount: number;
  recentImages: string[];
  createdAt: string;
};

export type UserSuggested = {
  _id: string;
  username: string;
  fullName: string;
  profilePicture: string | null;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  recentImages: string[];
  isFollowing: false;
};
