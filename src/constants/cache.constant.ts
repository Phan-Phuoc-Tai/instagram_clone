export const CACHE = {
  POSTS: {
    LIST: ["POSTS"],
    DETAIL(postId: string) {
      return [this.LIST, postId];
    },
    COMMENTS_OF_POST(postId: string) {
      return ["COMMENTS", postId];
    },
    REPLIES_OF_COMMENT(commentId: string) {
      return ["Replies", commentId];
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
