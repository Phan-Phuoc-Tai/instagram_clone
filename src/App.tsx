import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { CONFIG } from "./constants/config.constant";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import VerifyEmailTokenPage from "./pages/VerifyEmailTokenPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import ProfilePage from "./pages/ProfilePage";
import EditProfile from "./pages/EditProfilePage";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import MessagePage from "./pages/MessagePage";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={CONFIG.LOGIN} element={<LoginPage />} />
          <Route path={CONFIG.REGISTER} element={<RegisterPage />} />
          <Route path={CONFIG.VERIFY_EMAIL}>
            <Route index element={<VerifyEmailPage />} />
            <Route path=":token" element={<VerifyEmailTokenPage />} />
          </Route>
          <Route
            path={CONFIG.FORGOT_PASSWORD}
            element={<ForgotPasswordPage />}
          />
          <Route
            path={`${CONFIG.RESET_PASSWORD}/:token`}
            element={<ResetPasswordPage />}
          />
        </Route>
        <Route element={<AuthMiddleware />}>
          <Route element={<MainLayout />}>
            <Route path={CONFIG.HOME} element={<HomePage />} />
            <Route path={CONFIG.MESSAGE} element={<MessagePage />} />
            <Route path={`${CONFIG.PROFILE}`}>
              <Route path="edit" element={<EditProfile />} />
              <Route path=":userId" element={<ProfilePage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}
