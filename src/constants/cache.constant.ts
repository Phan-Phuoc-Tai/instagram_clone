export const CACHE = {
  POSTS: {
    LIST: ["POSTS"],
    DETAIL(postId: string) {
      return [this.LIST, postId];
    },
    COMMENTS(postId: string) {
      return ["COMMENTS", postId];
    },
    REPLIES_OF_COMMENT(commentId: string) {
      return ["REPLIES", commentId];
    },
  },
  USERS: {
    LIST: ["USERS"],
    ID(id: string) {
      return [this.LIST, id];
    },
    SUGGESTED_USERS: ["SUGGESTED_USER"],
  },
  FOLLOW: {
    FOLLOWERS(userId: string) {
      return ["FOLLOWERS", userId];
    },
    FOLLOWING(userId: string) {
      return ["FOLLOWING", userId];
    },
  },
};
