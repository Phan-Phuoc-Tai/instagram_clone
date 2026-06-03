import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../../ui/button";
import AvatarDefault from "../../icons/AvatarDefault";
import type { UserSuggested } from "@/types/user.type";
import { Send } from "lucide-react";
import CameraIcon from "../../icons/CameraIcon";
import { useFollowUser } from "@/hooks/follows/useFollowUser";
import { useState } from "react";
import { Spinner } from "../../ui/spinner";
import { useUnfollowUser } from "@/hooks/follows/useUnfollowUser";
type Props = {
  suggestedUser: UserSuggested;
};
export default function SuggestedUserCard({ suggestedUser }: Props) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const followUser = useFollowUser(suggestedUser._id);
  const unfollowUser = useUnfollowUser(suggestedUser._id);
  const [isFollow, setIsFollow] = useState<boolean>(suggestedUser.isFollowing);
  const [followers, setFollowers] = useState<number>(
    suggestedUser.followersCount,
  );
  const handleFollowUser = async () => {
    const result = await followUser.mutateAsync();
    setIsFollow(result);
    setFollowers(followers + 1);
  };
  const handleUnfollowUser = async () => {
    const result = await unfollowUser.mutateAsync();
    setIsFollow(!result);
    setFollowers(followers - 1);
  };

  return (
    <HoverCard openDelay={500} closeDelay={100}>
      <div className="flex items-center justify-between">
        <HoverCardTrigger asChild className="my-2">
          <div className="flex items-center justify-between gap-3 py-1">
            <Avatar className="flex items-center justify-center size-11 cursor-pointer">
              <AvatarImage
                src={
                  suggestedUser.profilePicture
                    ? `${BASE_URL}${suggestedUser.profilePicture}`
                    : `${BASE_URL}/null`
                }
              />
              <AvatarFallback asChild>
                <div className="p-1 border bg-white">
                  <AvatarDefault width="26px" height="26px" />
                </div>
              </AvatarFallback>
            </Avatar>
            <p className="text-(--ig-primary-text) text-sm font-medium mr-auto truncate w-33 cursor-pointer">
              {suggestedUser.fullName === ""
                ? suggestedUser.username
                : suggestedUser.fullName}
            </p>
          </div>
        </HoverCardTrigger>
        {isFollow ? (
          <p
            className=" text-(--ig-primary-text) text-xs font-medium cursor-pointer px-2 py-0.5 outline-2 outline-black/70"
            onClick={handleUnfollowUser}
          >
            Following
          </p>
        ) : (
          <p
            className=" text-(--ig-follow-text) py-1 text-xs font-medium hover:text-(--ig-follow-text-hover) cursor-pointer"
            onClick={handleFollowUser}
          >
            Follow
          </p>
        )}
      </div>
      <HoverCardContent
        className="w-90 p-0 rounded-3xl border-t ring-0 shadow-xl"
        align="start"
      >
        <div className="w-full ">
          <div className="flex items-center gap-3 p-4">
            <Avatar className="flex items-center justify-center size-11">
              <AvatarImage
                src={
                  suggestedUser.profilePicture
                    ? `${BASE_URL}${suggestedUser.profilePicture}`
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
                {suggestedUser.username}
              </p>
              <p className="text-(--ig-secondary-text) text-sm font-normal  ">
                {suggestedUser.fullName}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-10 w-full text-center text-(--ig-primary-text) pb-4">
            <div>
              <h3 className="font-bold text-base">
                {suggestedUser.postsCount}
              </h3>
              <p>posts</p>
            </div>
            <div>
              <h3 className="font-bold text-base">{followers}</h3>
              <p>followers</p>
            </div>
            <div>
              <h3 className="font-bold text-base">
                {suggestedUser.followingCount}
              </h3>
              <p>followings</p>
            </div>
          </div>
          <div className="w-full h-auto flex items-center gap-1 overflow-hidden">
            {suggestedUser.postsCount === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 px-4 py-4 border-y">
                <CameraIcon />
                <p className="font-bold base text-(--ig-primary-text)">
                  No posts yet
                </p>
                <p className="text-center text-(--ig-secondary-text)">
                  When {suggestedUser.username} shares photos and reels, you'll
                  see them here.
                </p>
              </div>
            )}
            {suggestedUser.recentImages.map((image, index) => (
              <div key={index} className="w-[calc(100%/3)] h-30">
                <img
                  src={image ? `${BASE_URL}${image}` : `${BASE_URL}/null`}
                  className="w-full object-cover h-full"
                />
              </div>
            ))}
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
