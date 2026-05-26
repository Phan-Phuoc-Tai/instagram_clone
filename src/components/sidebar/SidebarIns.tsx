import Instagram from "../icons/Instagram";
import HomeIcon from "../icons/HomeIcon";
import { NavLink } from "react-router-dom";
import { CONFIG } from "@/constants/config.constant";
import ExploreIcon from "../icons/ExploreIcon";
import { cn } from "@/lib/utils";

export default function SidebarIns() {
  return (
    <aside className="group fixed top-0 left-0 bottom-0 z-50 w-18 hover:w-40 transition-all ease-in-out duration-300 px-3 pt-2 pb-5 flex flex-col justify-between bg-white">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-black/5 cursor-pointer">
        <Instagram />
      </div>
      <ul className="group-hover:w-40">
        <NavLink
          to={CONFIG.HOME}
          children={({ isActive }) => (
            <div className="flex items-center gap-4">
              <HomeIcon isActive={isActive} />
              <span
                className={cn(
                  "hidden group-hover:block",
                  isActive && "font-semibold",
                )}
              >
                Home
              </span>
            </div>
          )}
        />
        <li>Reels</li>
        <li>Message</li>
        <li>Search</li>
        <NavLink
          to={CONFIG.EXPLORE}
          children={({ isActive }) => (
            <div className="flex items-center gap-4">
              <ExploreIcon isActive={isActive} />
              <span
                className={cn(
                  "hidden group-hover:block",
                  isActive && "font-semibold",
                )}
              >
                Explore
              </span>
            </div>
          )}
        />
        <li>Notifications</li>
        <li>Create</li>
        <li>Avatar</li>
      </ul>
      <div>Logout</div>
    </aside>
  );
}
