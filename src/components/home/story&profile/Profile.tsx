import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/stores/user.store";
import AvatarDefault from "../../icons/AvatarDefault";
import UserLoading from "../../loading/UserLoading";
import { NavLink } from "react-router-dom";
import { CONFIG } from "@/constants/config.constant";
export default function Profile() {
  const { user, isLoading } = useUserStore();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  return (
    <>
      {isLoading ? (
        <UserLoading />
      ) : (
        <div className="flex items-center gap-3">
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
          <div className="text-sm font-normal">
            <NavLink
              to={`${CONFIG.PROFILE}/${user._id}`}
              className="text-(--ig-primary-text) font-medium"
            >
              {user.username}
            </NavLink>
            <p className="text-(--ig-secondary-text)">{user.fullName}</p>
          </div>
        </div>
      )}
    </>
  );
}
