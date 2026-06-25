import { CONFIG } from "@/constants/config.constant";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export const AuthMiddleware = () => {
  const { pathname } = useLocation();
  const isLogin = localStorage.getItem("accessToken") ? true : false;
  if (!isLogin) {
    return <Navigate to={`${CONFIG.LOGIN}?continue=${pathname}"`} replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};
