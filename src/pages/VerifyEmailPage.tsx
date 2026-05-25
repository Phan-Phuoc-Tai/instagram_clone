import CheckMail from "@/components/icons/CheckMail";
import { Button } from "@/components/ui/button";
import { RESEND_VERIFICATION_EMAIL } from "@/constants/auth.constant";
import { authService } from "@/services/auth.service";
import { Send } from "lucide-react";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const email = history.state.usr.email;
  const handleResendVerificationEmail = () => {
    toast.promise(authService.resendVerificationEmail(email), {
      loading: RESEND_VERIFICATION_EMAIL.LOADING,
      error: RESEND_VERIFICATION_EMAIL.ERROR,
      success: RESEND_VERIFICATION_EMAIL.SUCCESS,
    });
  };
  return (
    <div className="max-w-150 w-full h-screen flex items-center justify-center mx-auto ">
      <div className="flex flex-col items-center gap-3 border rounded-lg shadow-sm px-5 py-6">
        <CheckMail />
        <h3 className="text-xl text-green-600 mb-3">
          A verification link has been sent to your email. Please check your
          inbox or spam folder to complete the registration.
        </h3>
        <Button
          className="text-lg bg-(--primary-bg-button)/85 hover:bg-(--primary-bg-button) cursor-pointer"
          onClick={handleResendVerificationEmail}
        >
          <Send
            style={{
              width: 20,
              height: 20,
            }}
          />
          <span>Resend the verification email</span>
        </Button>
      </div>
    </div>
  );
}
