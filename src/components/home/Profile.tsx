import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/stores/user.store";
import AvatarDefault from "../icons/AvatarDefault";
import UserLoading from "../loading/UserLoading";
export default function Profile() {
  const { user, isLoading } = useUserStore();
  return (
    <>
      {isLoading ? (
        <UserLoading />
      ) : (
        <div className="flex items-center gap-3">
          <Avatar className="flex items-center justify-center size-11">
            <AvatarImage src={user.profilePicture!} />
            <AvatarFallback asChild>
              <div className="p-1 border bg-white">
                <AvatarDefault width="26px" height="26px" />
              </div>
            </AvatarFallback>
          </Avatar>
          <div className="text-sm font-normal">
            <h3 className="text-(--ig-primary-text) font-medium">
              {user.username}
            </h3>
            <p className="text-(--ig-secondary-text)">{user.fullName}</p>
          </div>
        </div>
      )}
    </>
  );
}
