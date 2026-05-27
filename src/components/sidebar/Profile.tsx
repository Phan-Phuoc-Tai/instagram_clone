import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/stores/user.store";
import AvatarDefault from "../icons/AvatarDefault";
export default function Profile() {
  const { user } = useUserStore();
  return (
    <div>
      <Avatar size="sm" className="flex items-center justify-center">
        <AvatarImage src={user.profilePicture!} />
        <AvatarFallback asChild>
          <div className="p-1 border bg-white">
            <AvatarDefault width="24px" height="24px" />
          </div>
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
