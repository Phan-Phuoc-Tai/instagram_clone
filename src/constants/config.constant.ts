export const CONFIG = {
  REGISTER: "/register",
  LOGIN: "/login",
  HOME: "/",
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
  },
};
