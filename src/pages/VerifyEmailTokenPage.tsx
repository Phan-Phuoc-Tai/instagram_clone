import { VERIFY_EMAIL } from "@/constants/auth.constant";
import { CONFIG } from "@/constants/config.constant";
import { authService } from "@/services/auth.service";
import { CircleCheckBig, LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function VerifyEmailTokenPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState(3);
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    if (!token) {
      return;
    }
    const handleVerifyEmail = async () => {
      const status = await authService.verifyEmail(token!);
      if (!status) {
        return toast.error(VERIFY_EMAIL.ERROR);
      }
      setIsVerified(status);
    };
    handleVerifyEmail();
  }, [token]);

  useEffect(() => {
    if (!isVerified) {
      return;
    }
    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    if (count === 0) {
      navigate(CONFIG.LOGIN);
      return;
    }
    return () => clearTimeout(timer);
  }, [count, isVerified, navigate]);
  return (
    <div className="max-w-150 w-full h-screen flex items-center justify-center mx-auto ">
      <div className="flex flex-col items-center gap-3 border rounded-lg shadow-sm px-5 py-6 w-full h-50">
        {isVerified ? (
          <div className="flex items-center justify-center h-full flex-col text-green-500 text-xl">
            <CircleCheckBig
              style={{
                width: 28,
                height: 28,
              }}
            />
            <span>Your email address has been successfully verified.</span>
            <span>We are redirecting to the login page after </span>
            <p className="text-center text-2xl">{count}</p>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full gap-3">
            <LoaderIcon className="animate-spin" />
            <span>{VERIFY_EMAIL.LOADING}</span>
          </div>
        )}
      </div>
    </div>
  );
}
