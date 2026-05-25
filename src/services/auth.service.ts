import { API } from "@/constants/config.constant";
import { axiosInstance } from "@/lib/axios";
import type { FormData } from "@/types/form.type";

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
};
