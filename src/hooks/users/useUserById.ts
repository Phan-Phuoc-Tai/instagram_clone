import { CACHE } from "@/constants/cache.constant";
import { userService } from "@/services/user.service";
import type { UserById } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";

export const useUserById = (id: string) => {
  const query = useQuery({
    queryKey: CACHE.USERS.ID(id),
    queryFn: () => {
      //Xử lý TH id = undefined giảm số lần gọi API
      if (!id) {
        return {
          username: "Account has been deleted",
        } as UserById;
      }
      return userService.getUserById(id);
    },
  });
  return {
    user:
      query.data ??
      ({
        username: "Account has been deleted",
      } as UserById),
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
