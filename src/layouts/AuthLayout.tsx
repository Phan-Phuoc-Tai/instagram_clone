import Footer from "@/components/footer/Footer";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
}
