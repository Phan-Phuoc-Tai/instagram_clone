import { axiosInstance } from "@/lib/axios";
import type { FormData } from "@/types/form.type";

export const authService = {
  login: async (formData: Partial<FormData>) => {
    const response = await axiosInstance.post("/api/auth/login", formData);
    const { data } = response.data;
    return data;
  },
};
