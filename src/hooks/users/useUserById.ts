import { CACHE } from "@/constants/cache.constant";
import { userService } from "@/services/user.service";
import type { User } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";

export const useUserById = (id: string) => {
  const query = useQuery({
    queryKey: CACHE.USERS.ID(id),
    queryFn: () => {
      //Xử lý TH id = undefined giảm số lần gọi API
      if (!id) {
        return {
          username: "Tài khoản đã bị xóa",
        } as User;
      }
      return userService.getUserById(id);
    },
  });
  return {
    user:
      query.data ??
      ({
        username: "Tài khoản đã bị xóa",
      } as User),
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
