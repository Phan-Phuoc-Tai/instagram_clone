import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarDefault from "../icons/AvatarDefault";
import type { User } from "@/types/user.type";
import { NavLink } from "react-router-dom";
import { CONFIG } from "@/constants/config.constant";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { searchHistoryService } from "@/services/searchHistory.service";
type Props = {
  user: User;
  showCloseBtn: boolean;
  keyword?: string;
};
export default function SearchItem({ user, showCloseBtn, keyword }: Props) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const handleAddSearchHistory = async () => {
    await searchHistoryService.addSearchHistory(user._id, keyword!);
  };
  return (
    <div className="flex items-center justify-between gap-3 py-1">
      <Avatar className="flex items-center justify-center size-11 cursor-pointer">
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
      <div className="mr-auto">
        <NavLink
          onClick={handleAddSearchHistory}
          to={`${CONFIG.PROFILE}/${user._id}`}
          className="text-(--ig-primary-text) text-sm font-medium truncate w-33 cursor-pointer"
        >
          {user.username}
        </NavLink>
        <p className="text-(--ig-secondary-text) text-sm font-normal  ">
          {user.fullName}
        </p>
      </div>
      {showCloseBtn && (
        <Button variant={"outline"} className="border-0 cursor-pointer">
          <X />
        </Button>
      )}
    </div>
  );
}
