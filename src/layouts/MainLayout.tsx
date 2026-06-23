import SidebarIns from "@/components/sidebar/SidebarIns";
import { useUserStore } from "@/stores/user.store";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const { refetchUser } = useUserStore();
  useEffect(() => {
    refetchUser();
  }, []);

  return (
    <div>
      <SidebarIns />
      <Outlet />
    </div>
  );
}
