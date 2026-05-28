import Instagram from "../icons/Instagram";
import HomeIcon from "../icons/HomeIcon";
import { NavLink } from "react-router-dom";
import { CONFIG } from "@/constants/config.constant";
import ExploreIcon from "../icons/ExploreIcon";
import { cn } from "@/lib/utils";
import ReelsIcon from "../icons/ReelsIcon";
import MessageIcon from "../icons/MessageIcon";
import SearchIcon from "../icons/SearchIcon";
import NotificationsIcon from "../icons/NotificationsIcon";
import CreateIcon from "../icons/CreateIcon";
import Profile from "./Profile";

export default function SidebarIns() {
  const ITEM_CSS = {
    DIV: "flex items-center gap-4 p-3 my-1 hover:bg-black/5 cursor-pointer rounded-lg overflow-hidden",
    SPAN: "opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-transform ease-in-out duration-300",
  };
  return (
    <aside className="group fixed top-0 left-0 bottom-0 z-50 w-18 hover:w-60 transition-all ease-in-out duration-300 px-3 pt-2 pb-5 flex flex-col justify-between bg-white">
      <NavLink
        to={CONFIG.HOME}
        className="w-10 h-10 flex items-center justify-center mx-1 rounded-lg hover:bg-black/5 cursor-pointer"
      >
        <Instagram />
      </NavLink>
      <ul className="group-hover:w-51">
        <NavLink
          to={CONFIG.HOME}
          children={({ isActive }) => (
            <div className={ITEM_CSS.DIV}>
              <HomeIcon isActive={isActive} className="w-6 h-6" />
              <span className={cn(ITEM_CSS.SPAN, isActive && "font-semibold")}>
                Home
              </span>
            </div>
          )}
        />
        <li className={ITEM_CSS.DIV}>
          <ReelsIcon className="w-6 h-6" />
          <span className={cn(ITEM_CSS.SPAN)}>Reels</span>
        </li>
        <li className={ITEM_CSS.DIV}>
          <MessageIcon className="w-6 h-6" />
          <span className={cn(ITEM_CSS.SPAN)}>Message</span>
        </li>
        <li className={ITEM_CSS.DIV}>
          <SearchIcon className="w-6 h-6" />
          <span className={cn(ITEM_CSS.SPAN)}>Search</span>
        </li>
        <NavLink
          to={CONFIG.EXPLORE}
          children={({ isActive }) => (
            <div className={ITEM_CSS.DIV}>
              <ExploreIcon isActive={isActive} className="w-6 h-6" />
              <span className={cn(ITEM_CSS.SPAN, isActive && "font-semibold")}>
                Explore
              </span>
            </div>
          )}
        />
        <li className={ITEM_CSS.DIV}>
          <NotificationsIcon className="w-6 h-6" />
          <span className={cn(ITEM_CSS.SPAN)}>Notifications</span>
        </li>
        <li className={ITEM_CSS.DIV}>
          <CreateIcon className="w-6 h-6" />
          <span className={cn(ITEM_CSS.SPAN)}>Create</span>
        </li>
        <li className={ITEM_CSS.DIV}>
          <Profile />
          <span className={cn(ITEM_CSS.SPAN)}>Profile</span>
        </li>
      </ul>
      <div>Logout</div>
    </aside>
  );
}
