export const CONFIG = {
  HOME: "/",
  MESSAGE: "/message",
  PROFILE: "/profile",
  EDIT_PROFILE: "/profile/edit",
  LOGIN: "/login",
  REGISTER: "/register",
  VERIFY_EMAIL: "/verify-email",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
};

export const API = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    RESEND_VERIFICATION_EMAIL: "/api/auth/resend-verification-email",
    VERIFY_EMAIL(token: string) {
      return `/api/auth/verify-email/${token}`;
    },
    FORGOT_PASSWORD: "/api/auth/forgot-password",
    RESET_PASSWORD(token: string) {
      return `/api/auth/reset-password/${token}`;
    },
    REFRESH_TOKEN: "/api/auth/refresh-token",
    LOGOUT: "/api/auth/logout",
  },
  USER: {
    PROFILE: "/api/users/profile",
    BY_ID(id: string) {
      return `/api/users/${id}`;
    },
    SUGGESTED_USERS(limit = 5) {
      return `/api/users/suggested?limit=${limit}`;
    },
    SEARCH(keyword: string) {
      return `/api/users/search?q=${keyword}`;
    },
  },
  FOLLOW: {
    FOLLOW_USER(userId: string) {
      return `/api/follow/${userId}/follow`;
    },
    FOLLOWERS(userId: string, limit: number, page: number) {
      return `/api/follow/${userId}/followers?limit=${limit}&page=${page}`;
    },
    FOLLOWING(userId: string, limit: number, page: number) {
      return `/api/follow/${userId}/following?limit=${limit}&page=${page}`;
    },
  },
  POSTS: {
    NEWS_FEED(limit: number, offset: number) {
      return `/api/posts/feed?limit=${limit}&offset=${offset}`;
    },
    POST: "/api/posts",
    POST_ID(postId: string) {
      return `/api/posts/${postId}`;
    },
    LIKE_POST(postId: string) {
      return `/api/posts/${postId}/like`;
    },
    SAVE_POST(postId: string) {
      return `/api/posts/${postId}/save`;
    },
    COMMENTS_OF_POST(postId: string, limit: number, offset: number) {
      return `/api/posts/${postId}/comments?limit=${limit}&offset=${offset}`;
    },
    REPLIES_OF_COMMENT(
      postId: string,
      commentId: string,
      limit: number,
      offset: number,
    ) {
      return `/api/posts/${postId}/comments/${commentId}/replies?limit=${limit}&offset=${offset}`;
    },
    CREATE_COMMENT(postId: string) {
      return `/api/posts/${postId}/comments`;
    },
    DELETE_COMMENT(postId: string, commentId: string) {
      return `/api/posts/${postId}/comments/${commentId}`;
    },
    CREATE_REPLY_COMMENT(postId: string, commentId: string) {
      return `/api/posts/${postId}/comments/${commentId}/replies`;
    },
    LIKE_COMMENT(postId: string, commentId: string) {
      return `/api/posts/${postId}/comments/${commentId}/like`;
    },
    POSTS_USER_ID(userId: string, filter: string) {
      return `/api/posts/user/${userId}?filter=${filter}`;
    },
    POST_STATS_USER_ID(userId: string) {
      return `/api/posts/user/${userId}/stats`;
    },
  },
  SEARCH_HISTORY: "/api/search-history",
  MESSAGES: {
    CONVERSATIONS(page: number, limit: number) {
      return `/api/messages/conversations?page=${page}&limit=${limit}`;
    },
  },
};
