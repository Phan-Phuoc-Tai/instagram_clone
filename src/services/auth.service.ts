import type { FormData } from "@/types/form.type";
import { API } from "../constants/config.constant";
import { axiosInstance } from "../lib/axios";

export const authService = {
  login: async (formData: Partial<FormData>) => {
    const response = await axiosInstance.post(API.AUTH.LOGIN, formData);
    const { data } = response.data;
    return data;
  },
  register: async (formData: Partial<FormData>) => {
    const response = await axiosInstance.post(API.AUTH.REGISTER, formData);
    const { data } = response.data;
    return data;
  },
  resendVerificationEmail: async (email: string) => {
    const response = await axiosInstance.post(
      API.AUTH.RESEND_VERIFICATION_EMAIL,
      {
        email,
      },
    );
    const { success } = response.data;
    return success;
  },
  verifyEmail: async (token: string) => {
    const response = await axiosInstance.post(API.AUTH.VERIFY_EMAIL(token));
    const { success } = response.data;
    return success;
  },
  forgotPassword: async (email: string) => {
    const response = await axiosInstance.post(API.AUTH.FORGOT_PASSWORD, {
      email,
    });
    const { success } = response.data;
    return success;
  },
  resetPassword: async (token: string, formData: Partial<FormData>) => {
    const response = await axiosInstance.post(
      API.AUTH.RESET_PASSWORD(token),
      formData,
    );
    const { success } = response.data;
    return success;
  },
  refreshToken: async (
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    const response = await axiosInstance.post(API.AUTH.REFRESH_TOKEN, {
      refreshToken,
    });
    const { data } = response.data;
    return data;
  },
  logout: async (refreshToken: string) => {
    const response = await axiosInstance.post(API.AUTH.LOGOUT, {
      refreshToken,
    });
    const { success } = response.data;
    return success;
  },
};
