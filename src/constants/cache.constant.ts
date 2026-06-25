export const CACHE = {
  POSTS: {
    LIST: ["POSTS"],
    DETAIL(postId: string) {
      return [...this.LIST, postId];
    },
    COMMENTS(postId: string) {
      return ["COMMENTS", postId];
    },
    REPLIES_OF_COMMENT(commentId: string) {
      return ["REPLIES", commentId];
    },
    LIST_OF_USER_ID(userId: string) {
      return [...this.LIST, userId];
    },
  },
  USERS: {
    LIST: ["USERS"],
    ID(id: string) {
      return [...this.LIST, id];
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
  SEARCH_HISTORY: ["SEARCH_HISTORY"],
  MESSAGE: {
    CONVERSATIONS: ["CONVERSATIONS"],
  },
};
