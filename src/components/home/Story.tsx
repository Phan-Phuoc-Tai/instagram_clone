import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useUserStore } from "@/stores/user.store";
import AvatarDefault from "../icons/AvatarDefault";
import { useSuggestedUsers } from "@/hooks/users/useSuggestedUsers";
export default function Story() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { user } = useUserStore();
  const { suggestedUsers } = useSuggestedUsers(5);
  const storyUserList = [user, ...suggestedUsers];
  return (
    <Carousel className="w-full pb-3 mb-6">
      <CarouselContent>
        {storyUserList.map((storyUser, index) => (
          <CarouselItem key={index} className="basis-1/6 pl-2">
            <div className="p-2 ">
              <div className="w-22">
                <div className="w-max flex items-center justify-center rounded-full bg-linear-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-0.75">
                  <div className="rounded-full bg-background p-0.75 ">
                    <Avatar className="size-18 flex items-center justify-center ">
                      <AvatarImage
                        src={
                          storyUser.profilePicture
                            ? `${BASE_URL}${storyUser.profilePicture}`
                            : `${BASE_URL}/null`
                        }
                      />
                      <AvatarFallback
                        asChild
                        className="after:border-none after:border-transparent"
                      >
                        <AvatarDefault width="50px" height="50px" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <p className="mt-px text-sm text-center text-(--primary-text) truncate w-20">
                  {storyUser.username}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
