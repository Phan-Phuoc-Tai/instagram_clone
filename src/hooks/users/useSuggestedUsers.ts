import { CACHE } from "@/constants/cache.constant";
import { userService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useSuggestedUsers = (limit: number) => {
  const query = useQuery({
    queryKey: CACHE.USERS.SUGGESTED_USERS,
    queryFn: () => userService.getSuggestedUsers(limit),
  });
  return {
    suggestedUsers: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
