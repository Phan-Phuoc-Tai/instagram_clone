import { NavLink } from "react-router-dom";
import type { Follower } from "@/types/follower.type";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import AvatarDefault from "../icons/AvatarDefault";
import { useUserById } from "@/hooks/users/useUserById";
import { useFollowUser } from "@/hooks/follows/useFollowUser";
import { useUnfollowUser } from "@/hooks/follows/useUnfollowUser";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Spinner } from "../ui/spinner";
import { Send } from "lucide-react";
import UserLoading from "../loading/UserLoading";
import { CONFIG } from "@/constants/config.constant";
import { useUserStore } from "@/stores/user.store";
import { PROFILE_CONFIG } from "@/constants/profile.constant";

type Props = {
  follower: Follower;
  setFollowingCount: Dispatch<SetStateAction<number>>;
};
export default function Follower({ follower, setFollowingCount }: Props) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { user, isLoading } = useUserById(follower._id);
  const { user: myProfile } = useUserStore();
  const isOwner = user._id === myProfile._id;
  const [isFollow, setIsFollow] = useState(user.isFollowing);
  const [followers, setFollowers] = useState(user.followersCount);
  const followUser = useFollowUser(user._id);
  const unfollowUser = useUnfollowUser(user._id);
  const handleFollowUser = async () => {
    const result = await followUser.mutateAsync();
    setIsFollow(result);
    setFollowers((prev) => prev + 1);
    setFollowingCount((prev) => prev + 1);
  };
  const handleUnfollowUser = async () => {
    const result = await unfollowUser.mutateAsync();
    setIsFollow(!result);
    setFollowers((prev) => prev - 1);
    setFollowingCount((prev) => prev - 1);
  };
  useEffect(() => {
    const handleSetValue = () => {
      setIsFollow(user.isFollowing);
      setFollowers(user.followersCount);
    };
    handleSetValue();
  }, [user]);

  return (
    <>
      {isLoading ? (
        Array.from({ length: 7 }).map((_, index) => (
          <div className="py-2" key={index}>
            <UserLoading />
          </div>
        ))
      ) : (
        <HoverCard openDelay={10} closeDelay={100}>
          <div className="flex items-center justify-between">
            <HoverCardTrigger asChild className="py-2">
              <div className="info flex items-center justify-between gap-3">
                <div>
                  <Avatar className="flex items-center justify-center size-11 cursor-pointer">
                    <AvatarImage
                      src={
                        follower.profilePicture
                          ? `${BASE_URL}${follower.profilePicture}`
                          : `${BASE_URL}/null`
                      }
                    />
                    <AvatarFallback asChild>
                      <div className="p-1 border bg-white">
                        <AvatarDefault width="24px" height="24px" />
                      </div>
                    </AvatarFallback>
                  </Avatar>
                </div>
                {!isLoading && (
                  <>
                    <div className="mr-auto text-sm cursor-pointer  ">
                      <NavLink
                        to={`${CONFIG.PROFILE}/${user._id}`}
                        className="text-(--ig-primary-text) font-semibold "
                      >
                        {user.username}
                      </NavLink>
                      <p className="text-(--ig-secondary-text) font-semibold ">
                        {user.fullName}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </HoverCardTrigger>
            {isOwner ? (
              <></>
            ) : isFollow ? (
              <Button
                variant={"secondary"}
                className="cursor-pointer ring-0 focus-visible:ring-0 border-0"
                onClick={handleUnfollowUser}
              >
                {unfollowUser.isPending ? (
                  <Spinner />
                ) : (
                  PROFILE_CONFIG.FOLLOWING
                )}
              </Button>
            ) : (
              <Button
                className=" bg-(--primary-bg-button) hover:bg-blue-500  text-white cursor-pointer ring-0 focus-visible:ring-0 border-0"
                onClick={handleFollowUser}
              >
                {followUser.isPending ? <Spinner /> : PROFILE_CONFIG.FOLLOW}
              </Button>
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
                  <NavLink
                    to={`${CONFIG.PROFILE}/${user._id}`}
                    className="text-(--ig-primary-text) text-base font-semibold "
                  >
                    {user.username}
                  </NavLink>

                  <p className="text-(--ig-secondary-text) text-sm font-normal  ">
                    {user.fullName}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-10 w-full text-center text-(--ig-primary-text) pb-4">
                <div>
                  <h3 className="font-bold text-base">{followers}</h3>
                  <p>{PROFILE_CONFIG.FOLLOW}</p>
                </div>
                <div>
                  <h3 className="font-bold text-base">{user.followingCount}</h3>
                  <p>{PROFILE_CONFIG.FOLLOWING}</p>
                </div>
              </div>

              <div className="py-4 px-2 gap-1 w-full flex items-center justify-between ">
                {followUser.isPending || unfollowUser.isPending ? (
                  <div className="w-full flex items-center justify-center">
                    <Spinner />
                  </div>
                ) : isFollow ? (
                  <>
                    <Button className="flex-1 bg-(--primary-bg-button) hover:bg-blue-500 cursor-pointer ring-0 focus-visible:ring-0 border-0">
                      <Send />
                      <span>{PROFILE_CONFIG.MESSAGE}</span>
                    </Button>
                    <Button
                      variant={"secondary"}
                      className="flex-1 cursor-pointer"
                      onClick={handleUnfollowUser}
                    >
                      {PROFILE_CONFIG.FOLLOWING}
                    </Button>
                  </>
                ) : (
                  <Button
                    className="bg-(--primary-bg-button) hover:bg-blue-500 cursor-pointer w-full ring-0 focus-visible:ring-0 border-0"
                    onClick={handleFollowUser}
                  >
                    {PROFILE_CONFIG.FOLLOW}
                  </Button>
                )}
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      )}
    </>
  );
}
