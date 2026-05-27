import { userService } from "@/services/user.service";
import type { User } from "@/types/user.type";
import { create } from "zustand";
type UserStore = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User;
  refetchUser: () => void;
};
export const useUserStore = create<UserStore>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  user: {} as User,
  refetchUser: async () => {
    set({ isLoading: true });
    try {
      const user = await userService.profile();
      set({
        isAuthenticated: true,
        user,
      });
    } catch {
      set({
        isAuthenticated: false,
        user: {} as User,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
