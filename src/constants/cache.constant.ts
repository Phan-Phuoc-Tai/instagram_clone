export const CACHE = {
  POSTS: {
    LIST: ["POSTS"],
    DETAIL(postId: string) {
      return [this.LIST, postId];
    },
  },
  USERS: {
    LIST: ["users"],
    ID(id: string) {
      return [this.LIST, id];
    },
    SUGGESTED_USERS: ["suggestedUsers"],
  },
};
