import SidebarIns from "@/components/sidebar/SidebarIns";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex">
      <SidebarIns />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
