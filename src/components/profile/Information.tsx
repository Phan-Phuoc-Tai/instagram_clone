import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarDefault from "@/components/icons/AvatarDefault";
import { Button } from "@/components/ui/button";
import { useUserById } from "@/hooks/users/useUserById";
import { use, useEffect, useState } from "react";
import { PROFILE_CONFIG } from "@/constants/profile.constant";
import Modal from "../modals/Modal";
import Followers from "./Followers";
import Following from "./Following";
import { NavLink, useLocation } from "react-router-dom";
import { CONFIG } from "@/constants/config.constant";
import { ProfileContext } from "@/contexts/profile.context";
import { useFollowUser } from "@/hooks/follows/useFollowUser";
import { useUnfollowUser } from "@/hooks/follows/useUnfollowUser";
import ProfileLoading from "../loading/ProfileLoading";
import { Spinner } from "../ui/spinner";
import { postService } from "@/services/post.service";
type Props = {
  userIdUrl: string;
};
export default function Information({ userIdUrl }: Props) {
  const { pathname } = useLocation();
  const { user, isLoading } = useUserById(userIdUrl);
  const { isOwner } = use(ProfileContext);
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [isShowFollowers, setIsShowFollowers] = useState(false);
  const [isShowFollowing, setIsShowFollowing] = useState(false);
  const [followingCount, setFollowingCount] = useState(user.followingCount);
  const [followersCount, setFollowersCount] = useState(user.followersCount);
  const [postsCount, setPostCount] = useState(0);
  const followUser = useFollowUser(user._id);
  const unfollowUser = useUnfollowUser(user._id);
  const handleFollowUser = async () => {
    const result = await followUser.mutateAsync();
    setIsFollowing(result);
    setFollowersCount((prev) => prev + 1);
  };
  const handleUnfollowUser = async () => {
    const result = await unfollowUser.mutateAsync();
    setIsFollowing(!result);
    setFollowersCount((prev) => prev - 1);
  };
  useEffect(() => {
    setFollowingCount(user.followingCount);
    setFollowersCount(user.followersCount);
    setIsFollowing(user.isFollowing);
  }, [user]);
  useEffect(() => {
    setIsShowFollowers(false);
    setIsShowFollowing(false);
    const handleSetPostCount = async () => {
      const total = await postService.getPostStatsByUserId(userIdUrl);
      setPostCount(total.totalPosts);
    };
    handleSetPostCount();
  }, [pathname]);
  return (
    <>
      <div className="max-w-170 mx-auto ">
        {isLoading ? (
          <ProfileLoading />
        ) : (
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
              <NavLink
                to={`${CONFIG.PROFILE}/${userIdUrl}`}
                className="text-2xl font-bold"
              >
                {user.username}
              </NavLink>
              <p className="mb-2 text-sm font-normal">{user.fullName}</p>
              <div className="flex items-center gap-4 text-sm font-normal select-none">
                <p>
                  <span className="font-semibold">{postsCount}</span>
                  <span> {PROFILE_CONFIG.POSTS}</span>
                </p>
                <p
                  onClick={() => setIsShowFollowers(true)}
                  className="cursor-pointer"
                >
                  <span className="font-semibold">{followersCount}</span>
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
        )}

        {isLoading ? (
          <div className=" w-max mx-auto mt-3 py-3 text-(--ig-secondary-text)">
            <Spinner
              style={{
                width: 28,
                height: 28,
              }}
            />
          </div>
        ) : isOwner ? (
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
          <div className="flex items-center gap-2 mt-3 py-3">
            {unfollowUser.isPending ? (
              <div className="h-11 w-max mx-auto text-(--ig-secondary-text)">
                <Spinner
                  style={{
                    width: 28,
                    height: 28,
                  }}
                />
              </div>
            ) : (
              <>
                <Button
                  onClick={handleUnfollowUser}
                  variant={"secondary"}
                  className="block flex-1 h-11 cursor-pointer focus-visible:ring-0"
                >
                  {PROFILE_CONFIG.FOLLOWING}
                </Button>
                <Button
                  variant={"secondary"}
                  className="block flex-1 h-11 cursor-pointer focus-visible:ring-0"
                >
                  {PROFILE_CONFIG.MESSAGE}
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 mt-3 py-3">
            {followUser.isPending ? (
              <div className="h-11 w-max mx-auto text-(--ig-secondary-text)">
                <Spinner
                  style={{
                    width: 28,
                    height: 28,
                  }}
                />
              </div>
            ) : (
              <Button
                onClick={handleFollowUser}
                className="block bg-(--primary-bg-button) hover:bg-blue-500 flex-1 h-11 cursor-pointer focus-visible:ring-0 capitalize"
              >
                {PROFILE_CONFIG.FOLLOW}
              </Button>
            )}
          </div>
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
