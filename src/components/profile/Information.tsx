import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarDefault from "@/components/icons/AvatarDefault";
import { Button } from "@/components/ui/button";
import { useUserById } from "@/hooks/users/useUserById";
import { useEffect, useState } from "react";
import { PROFILE_CONFIG } from "@/constants/profile.constant";
import Modal from "../modals/Modal";
import Followers from "./Followers";
import Following from "./Following";
type Props = {
  userIdUrl: string;
  postsCount: number;
  isOwner: boolean;
};
export default function Information({ userIdUrl, postsCount, isOwner }: Props) {
  const { user } = useUserById(userIdUrl);
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [isShowFollowers, setIsShowFollowers] = useState(false);
  const [isShowFollowing, setIsShowFollowing] = useState(false);
  const [followingCount, setFollowingCount] = useState(user.followingCount);
  useEffect(() => {
    setFollowingCount(user.followingCount);
  }, [user]);
  return (
    <>
      <div className="max-w-170 mx-auto ">
        <div className="flex items-center justify-between gap-7">
          <Avatar className="flex items-center justify-center size-37.5">
            <AvatarImage src={user.profilePicture!} />
            <AvatarFallback asChild>
              <div className="p-1 border bg-white">
                <AvatarDefault width="52px" height="52px" />
              </div>
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 my-4 text-(--ig-primary-text)">
            <p className="text-2xl font-bold">{user.username}</p>
            <p className="mb-2 text-sm font-normal">{user.fullName}</p>
            <div className="flex items-center gap-4 text-sm font-normal">
              <p>
                <span className="font-semibold">{postsCount}</span>
                <span> {PROFILE_CONFIG.POSTS}</span>
              </p>
              <p
                onClick={() => setIsShowFollowers(true)}
                className="cursor-pointer"
              >
                <span className="font-semibold">{user.followersCount}</span>
                <span> {PROFILE_CONFIG.FOLLOWERS}</span>
              </p>
              <p
                onClick={() => setIsShowFollowing(true)}
                className="cursor-pointer"
              >
                <span className="font-semibold">{followingCount}</span>
                <span> {PROFILE_CONFIG.FOLLOWING}</span>
              </p>
            </div>
          </div>
        </div>
        {isOwner ? (
          <div className="flex items-center gap-2 mt-3 py-3">
            <Button
              variant={"secondary"}
              className="block flex-1 h-11 cursor-pointer focus-visible:ring-0"
            >
              {PROFILE_CONFIG.EDIT_PROFILE}
            </Button>
            <Button
              variant={"secondary"}
              className="block flex-1 h-11 cursor-not-allowed focus-visible:ring-0"
            >
              {PROFILE_CONFIG.VIEW_ARCHIVE}
            </Button>
          </div>
        ) : isFollowing ? (
          <div>
            <Button>Following</Button>
          </div>
        ) : (
          ""
        )}
      </div>
      {isShowFollowers && (
        <Modal
          open={isShowFollowers}
          onClose={() => setIsShowFollowers(false)}
          title="Followers"
          styleTitle="text-center"
          styleContent="sm:max-w-140 max-h-100 bg-white ring-1 ring-foreground/10"
        >
          <Followers userId={userIdUrl} setFollowingCount={setFollowingCount} />
        </Modal>
      )}
      {isShowFollowing && (
        <Modal
          open={isShowFollowing}
          onClose={() => setIsShowFollowing(false)}
          title="Following"
          styleTitle="text-center"
          styleContent="sm:max-w-140 max-h-100 bg-white ring-1 ring-foreground/10"
        >
          <Following userId={userIdUrl} setFollowingCount={setFollowingCount} />
        </Modal>
      )}
    </>
  );
}
