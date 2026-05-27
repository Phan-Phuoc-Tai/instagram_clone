export const CONFIG = {
  HOME: "/",
  EXPLORE: "/explore",
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
  },
  USER: {
    PROFILE: "/api/users/profile",
  },
  POSTS: {
    NEWS_FEED: "/api/posts/feed",
  },
};
