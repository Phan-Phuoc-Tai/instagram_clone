import axios, { AxiosError } from "axios";
import { authService } from "../services/auth.service";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
type QueueItem = {
  resolve: (token: string | null) => void;
  reject: (error: AxiosError | unknown) => void;
};
let isRefreshing = false;
let failedQueue: QueueItem[] = [];
const processQueue = (
  error: AxiosError | unknown,
  token: string | null = null,
): void => {
  failedQueue.forEach((failedRequest) => {
    if (error) {
      failedRequest.reject(error);
    } else {
      failedRequest.resolve(token);
    }
  });
  failedQueue = [];
};
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }
    if (isRefreshing) {
      try {
        const token = await new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return await axiosInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    originalRequest._retry = true;
    isRefreshing = true;
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const newToken = await authService.refreshToken(refreshToken!);
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        newToken;
      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      originalRequest!.headers.Authorization = `Bearer ${newAccessToken}`;
      processQueue(null, newAccessToken);
      return await axiosInstance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
