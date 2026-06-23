import { CACHE } from "@/constants/cache.constant";
import { followService } from "@/services/follow.service";
import type { UserSuggested } from "@/types/user.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUnfollowUser = (userId: string) => {
  const queryClient = useQueryClient();
  const unfollowUser = useMutation({
    mutationFn: () => {
      return followService.unfollowUser(userId);
    },
    onSuccess() {
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
                  followersCount: suggestedUser.followersCount - 1,
                  isFollowing: false,
                }
              : suggestedUser;
          });
        },
      );
    },
  });
  return unfollowUser;
};
