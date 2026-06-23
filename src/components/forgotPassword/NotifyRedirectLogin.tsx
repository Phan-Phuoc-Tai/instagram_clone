import { CONFIG } from "@/constants/config.constant";
import { CircleCheckBig } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
type Props = {
  onClose: () => void;
};
export default function NotifyRedirectLogin({ onClose }: Props) {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    if (count === 0) {
      navigate(CONFIG.LOGIN);
      onClose();
      return;
    }
    return () => {
      clearTimeout(timer);
    };
  }, [count]);
  return (
    <div>
      <div className="flex items-center justify-center h-full flex-col text-green-500 text-xl">
        <CircleCheckBig
          style={{
            width: 28,
            height: 28,
          }}
        />
        <span>Your password has been successfully changed.</span>
        <span>We are redirecting to the login page after </span>
        <p className="text-center text-3xl">{count}</p>
      </div>
    </div>
  );
}
