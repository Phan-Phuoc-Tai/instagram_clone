import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/stores/user.store";
import AvatarDefault from "../icons/AvatarDefault";
import { Plus } from "lucide-react";
export default function CreateMyStory() {
  const { user } = useUserStore();
  return (
    <div className="p-2 ">
      <div className="w-18">
        <div className="w-max flex items-center justify-center rounded-full bg-linear-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-0.75">
          <div className="rounded-full bg-background p-0.75 ">
            <Avatar className="size-15 flex items-center justify-center ">
              <AvatarImage src={user.profilePicture!} className="relative" />
              <AvatarFallback
                asChild
                className="after:border-none after:border-transparent"
              >
                <AvatarDefault width="40px" height="40px" />
              </AvatarFallback>
              <div className="absolute -bottom-0.5 -right-3 text-black/80 border border-black/10 p-px rounded-full z-10 bg-white  ">
                <Plus
                  style={{
                    width: 18,
                    height: 18,
                  }}
                />
              </div>
            </Avatar>
          </div>
        </div>
        <p className="mt-px text-sm text-center text-(--primary-text)">
          {user.username}
        </p>
      </div>
    </div>
  );
}
