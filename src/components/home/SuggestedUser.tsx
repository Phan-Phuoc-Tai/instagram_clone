import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarDefault from "../icons/AvatarDefault";
import { useSuggestedUsers } from "@/hooks/users/useSuggestedUsers";
export default function SuggestedUser() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { suggestedUsers } = useSuggestedUsers();
  return (
    <>
      {suggestedUsers.map((suggestedUser) => (
        <div
          className="flex items-center justify-between gap-3 py-2"
          key={suggestedUser._id}
        >
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
          <p className="text-(--ig-primary-text) text-sm font-medium mr-auto truncate w-33">
            {suggestedUser.fullName}
          </p>
          <p className=" text-(--ig-follow-text) text-xs font-medium hover:text-(--ig-follow-text-hover) cursor-pointer">
            Follow
          </p>
        </div>
      ))}
    </>
  );
}
