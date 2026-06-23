import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONFIG } from "@/constants/config.constant";
import { useNavigate } from "react-router-dom";
import Email from "@/components/form/Email";
import { FORGOT_PASSWORD, FORM_CONFIG } from "@/constants/auth.constant";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { findAccountToSendEmailSchema } from "@/schemas/findAccountToSendEmail.schema";
import SubmitBtn from "@/components/form/SubmitBtn";
import { useState } from "react";
import { toast } from "sonner";
import { authService } from "@/services/auth.service";
import type { FormData } from "@/types/form.type";
import Modal from "@/components/modals/Modal";
import NotifySentEmail from "@/components/forgotPassword/NotifySentEmail";
export default function ForgotPasswordPage() {
  const LABEL = FORM_CONFIG.LABEL;
  const SUBMIT_BTN = FORM_CONFIG.SUBMIT_BTN;
  const NOTIFICATION = FORM_CONFIG.NOTIFICATION;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(findAccountToSendEmailSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (formData: Partial<FormData>) => {
    const email = formData.email;
    toast.promise(authService.forgotPassword(email!), {
      loading: FORGOT_PASSWORD.LOADING,
      error() {
        setIsLoading(false);
        return FORGOT_PASSWORD.ERROR;
      },
      success() {
        setEmail(email!);
        setIsOpen(true);
        setIsLoading(false);
        reset();
        return FORGOT_PASSWORD.SUCCESS;
      },
    });
  };
  return (
    <>
      <div className="max-w-150 w-full mx-auto mt-6">
        <div className="flex flex-col items-start gap-1.5 mb-3 -ml-1">
          <Button
            size={null}
            className="-ml-3 w-10 h-10 rounded-full bg-white hover:bg-black/5 text-(--secondary-icon) cursor-pointer"
            onClick={() => navigate(CONFIG.LOGIN)}
          >
            <ChevronLeft style={{ width: 28, height: 28 }} />
          </Button>
        </div>
        <div className="mb-3 text-(--primary-text)">
          <h2 className="text-(--primary-text) text-2xl font-semibold">
            Find Your Account
          </h2>
          <span className="text-(--primary-text) text-[15px] font-normal">
            Enter your mobile number, username or email address.
          </span>
          <span className="text-(--blue-link) font-bold cursor-default">
            Can't reset your password?
          </span>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <Email
            label={LABEL.EMAIL_REGISTER}
            register={register("email")}
            errorStatus={errors.email?.message ? true : false}
          />
          {errors.email?.message && (
            <p className="text-red-500 -mt-3">{errors.email.message}</p>
          )}
          <p className="text-sm text-(--primary-text)">
            You may receive WhatsApp and SMS notifications from us for security
            and login purposes.
          </p>
          <SubmitBtn
            content={SUBMIT_BTN.CONTINUE.TEXT}
            style={SUBMIT_BTN.CONTINUE}
            disabled={!isValid || isSubmitting}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </form>
      </div>
      {isOpen && (
        <Modal
          title={NOTIFICATION.FORGOT_PASSWORD}
          styleTitle={"text-2xl text-(--primary-text)"}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <NotifySentEmail email={email} onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}
