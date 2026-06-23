import { CACHE } from "@/constants/cache.constant";
import { followService } from "@/services/follow.service";
import type { UserSuggested } from "@/types/user.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFollowUser = (userId: string) => {
  const queryClient = useQueryClient();
  const followUser = useMutation({
    mutationFn: () => {
      return followService.followUser(userId);
    },
    onSuccess: () => {
      queryClient.setQueryData(
        CACHE.USERS.SUGGESTED_USERS,
        (oldList: UserSuggested[]) => {
          if (!oldList) {
            return [];
          }
          return oldList.filter((suggestedUser) => {
            return suggestedUser._id === userId
              ? {
                  ...suggestedUser,
                  followersCount: suggestedUser.followersCount + 1,
                  isFollowing: true,
                }
              : suggestedUser;
          });
        },
      );
    },
  });
  return followUser;
};
