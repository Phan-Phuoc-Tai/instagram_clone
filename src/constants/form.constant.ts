export const FORM_CONFIG = {
  SUBMIT_BTN: {
    LOG_IN: {
      textColor: "text-white",
      css: "bg-(--primary-bg-button) hover:bg-blue-600 cursor-pointer",
    },
    FORGOT_PASSWORD: {
      textColor: "text-(--primary-text)",
      css: "bg-transparent hover:bg-black/10 cursor-pointer",
    },
    LOGIN_WITH_FB: {
      textColor: "text-(--primary-text)",
      css: "bg-transparent hover:bg-black/10 border border-(--secondary-border-button) cursor-not-allowed",
    },
    CREATE_ACCOUNT: {
      textColor: "text-(--blue-link)",
      css: "bg-transparent hover:bg-black/10 border border-(--border-blue-link) cursor-pointer",
    },
  },
};

export const FORM_LOGIN = {
  ZOD_ERRORS: {
    EMAIL: {
      REQUIRED: "Email is required!",
      INVALID: "Email invalid!",
    },
    PASSWORD: "Password must be 6 characters!",
  },
  LOADING: "Processing...",
  ERROR: "Email or password incorrect!",
  SUCCESS: "Login success!",
};
