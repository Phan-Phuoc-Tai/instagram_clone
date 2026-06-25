export const FORM_CONFIG = {
  SUBMIT_BTN: {
    LOG_IN: {
      TEXT: "Log in",
      TEXT_COLOR: "text-white",
      CSS: "bg-(--primary-bg-button) hover:bg-blue-600 cursor-pointer",
    },
    FORGOT_PASSWORD: {
      TEXT: "Forgotten password?",
      TEXT_COLOR: "text-(--primary-text)",
      CSS: "bg-transparent hover:bg-black/10 cursor-pointer",
    },
    LOGIN_WITH_FB: {
      TEXT: "Log in with Facebook",
      TEXT_COLOR: "text-(--primary-text)",
      CSS: "bg-transparent hover:bg-black/10 border border-(--secondary-border-button) cursor-not-allowed",
    },
    CREATE_ACCOUNT: {
      TEXT: "Create new account",
      TEXT_COLOR: "text-(--blue-link)",
      CSS: "bg-transparent hover:bg-black/10 border border-(--border-blue-link) cursor-pointer",
      TYPE: "button",
    },
    REGISTER: {
      TEXT: "Submit",
      TEXT_COLOR: "text-white",
      CSS: "bg-(--primary-bg-button) hover:bg-blue-600 cursor-pointer",
    },
    ALREADY_ACCOUNT: {
      TEXT: "I already have an account",
      TEXT_COLOR: "text-(--primary-text)",
      CSS: "bg-transparent hover:bg-black/10 border border-(--secondary-border-button) cursor-pointer",
      TYPE: "button",
    },
    CONTINUE: {
      TEXT: "Continue",
      TEXT_COLOR: "text-white",
      CSS: "bg-(--primary-bg-button) hover:bg-blue-600 cursor-pointer",
    },
    RESET_PASSWORD: {
      TEXT: "Reset password",
      TEXT_COLOR: "text-white",
      CSS: "bg-(--primary-bg-button) hover:bg-blue-600 cursor-pointer",
    },
  },
  LABEL: {
    EMAIL: "Mobile number, username or email address",
    PASSWORD: "Password",
    EMAIL_REGISTER: "Mobile number or email address",
    FULL_NAME: "Full name",
    USERNAME: "Username",
    CONFIRM_PASSWORD: "Confirm password",
    NEW_PASSWORD: "New password",
    NEW_CONFIRM_PASSWORD: "New confirm password",
  },
  TITLE: {
    EMAIL: "Mobile number or email address",
    PASSWORD: "Password",
    CONFIRM_PASSWORD: "Confirm password",
    FULL_NAME: "Name",
    USERNAME: "Username",
    NEW_PASSWORD: "New password",
    NEW_CONFIRM_PASSWORD: "New confirm password",
  },
  NOTIFICATION: {
    FORGOT_PASSWORD: "Email sent",
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

export const FORM_REGISTER = {
  ZOD_ERRORS: {
    FULL_NAME: "Full name is required!",
    USERNAME: "Username is required!",
    EMAIL: {
      REQUIRED: "Email is required!",
      INVALID: "Email invalid!",
    },
    PASSWORD: {
      REQUIRED(fullError = true) {
        return fullError
          ? `Password must be 6 characters, must have at least a ${this.NOT_NUMBER}, ${this.NOT_UPPERCASE}, ${this.NOT_LOWERCASE}`
          : "Password must have at least a";
      },
      NOT_NUMBER: "number",
      NOT_UPPERCASE: "uppercase",
      NOT_LOWERCASE: "lowercase",
    },
    CONFIRM_PASSWORD: {
      REQUIRED: "Confirm password is required!",
      NOT_MATCH: "Confirm password does not match!",
    },
  },
  LOADING: "Processing...",
  ERROR: "Register failed!",
  SUCCESS: "Register success!",
};

export const RESEND_VERIFICATION_EMAIL = {
  LOADING: "Resend...",
  ERROR: "Verification email sent failed!",
  SUCCESS: "Verification email sent success!",
};

export const VERIFY_EMAIL = {
  LOADING: "Verifying...",
  ERROR: "Email verified failed!",
};

export const FORGOT_PASSWORD = {
  LOADING: "Processing...",
  ERROR: "Password reset email sent failed!",
  SUCCESS: "Password reset email sent success!",
};

export const RESET_PASSWORD = {
  LOADING: "Processing...",
  ERROR: "Password reset failed!",
  SUCCESS: "Password reset success!",
};

export const LOGOUT = {
  LOADING: "Processing...",
  ERROR: "Logout failed!",
  SUCCESS: "Logout success!",
};
