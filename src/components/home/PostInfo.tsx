import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import AvatarDefault from "../icons/AvatarDefault";
import { Send } from "lucide-react";
import { useFollowUser } from "@/hooks/follows/useFollowUser";
import { useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";
import { useUserById } from "@/hooks/users/useUserById";
import { useUnfollowUser } from "@/hooks/follows/useUnfollowUser";
type Props = {
  userId: string;
};
export default function PostInfo({ userId }: Props) {
  const { user, isLoading } = useUserById(userId);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const followUser = useFollowUser(user._id);
  const unfollowUser = useUnfollowUser(user._id);
  const [isFollow, setIsFollow] = useState(user.isFollowing);
  const [followers, setFollowers] = useState(user.followersCount);
  const handleFollowUser = async () => {
    const result = await followUser.mutateAsync();
    setIsFollow(result);
    setFollowers((prev) => prev + 1);
  };
  const handleUnfollowUser = async () => {
    const result = await unfollowUser.mutateAsync();
    setIsFollow(!result);
    setFollowers((prev) => prev - 1);
  };
  useEffect(() => {
    setIsFollow(user.isFollowing);
    setFollowers(user.followersCount);
  }, [user]);

  return (
    <HoverCard openDelay={10} closeDelay={100}>
      <HoverCardTrigger asChild className="my-2">
        <div className="info flex items-center justify-between gap-3">
          <div>
            <Avatar className="flex items-center justify-center size-8">
              <AvatarImage
                src={
                  user.profilePicture
                    ? `${BASE_URL}${user.profilePicture}`
                    : `${BASE_URL}/null`
                }
              />
              <AvatarFallback asChild>
                <div className="p-1 border bg-white">
                  <AvatarDefault width="18px" height="18px" />
                </div>
              </AvatarFallback>
            </Avatar>
          </div>
          {!isLoading && (
            <>
              <div className="flex items-center gap-1 mr-auto text-sm">
                <span className="text-(--ig-primary-text) font-semibold ">
                  {user.username}
                </span>
              </div>
            </>
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        className="w-90 p-0 rounded-3xl border-t ring-0 shadow-xl"
        align="start"
      >
        <div className="w-full ">
          <div className="flex items-center gap-3 p-4">
            <Avatar className="flex items-center justify-center size-11">
              <AvatarImage
                src={
                  user.profilePicture
                    ? `${BASE_URL}${user.profilePicture}`
                    : `${BASE_URL}/null`
                }
              />
              <AvatarFallback asChild>
                <div className="p-1 border bg-white">
                  <AvatarDefault width="26px" height="26px" />
                </div>
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-(--ig-primary-text) text-base font-semibold ">
                {user.username}
              </p>
              <p className="text-(--ig-secondary-text) text-sm font-normal  ">
                {user.fullName}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-10 w-full text-center text-(--ig-primary-text) pb-4">
            <div>
              <h3 className="font-bold text-base">{followers}</h3>
              <p>followers</p>
            </div>
            <div>
              <h3 className="font-bold text-base">{user.followingCount}</h3>
              <p>followings</p>
            </div>
          </div>

          <div className="py-4 px-2 gap-1 w-full flex items-center justify-between ">
            {followUser.isPending || unfollowUser.isPending ? (
              <div className="w-full flex items-center justify-center">
                <Spinner />
              </div>
            ) : isFollow ? (
              <>
                <Button className="flex-1 bg-(--primary-bg-button) hover:bg-blue-600 cursor-pointer">
                  <Send />
                  <span>Message</span>
                </Button>
                <Button
                  variant={"secondary"}
                  className="flex-1 cursor-pointer"
                  onClick={handleUnfollowUser}
                >
                  Following
                </Button>
              </>
            ) : (
              <Button
                className="bg-(--primary-bg-button) hover:bg-blue-600 cursor-pointer w-full"
                onClick={handleFollowUser}
              >
                Follow
              </Button>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
