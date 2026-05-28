import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/stores/user.store";
import AvatarDefault from "../icons/AvatarDefault";
export default function Story() {
  const { user } = useUserStore();
  return (
    <div className="p-2 ">
      <div className="w-22">
        <div
          className="w-max flex items-center justify-center rounded-full bg-linear-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] 
        p-0.75"
        >
          <div className="rounded-full bg-background p-0.75 ">
            <Avatar className="size-18 flex items-center justify-center ">
              <AvatarImage src={user.profilePicture!} />
              <AvatarFallback
                asChild
                className="after:border-none after:border-transparent"
              >
                <AvatarDefault width="50px" height="50px" />
              </AvatarFallback>
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
