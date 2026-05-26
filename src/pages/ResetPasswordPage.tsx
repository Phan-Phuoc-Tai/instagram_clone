import NotifyRedirectLogin from "@/components/forgotPassword/NotifyRedirectLogin";
import Password from "@/components/form/Password";
import SubmitBtn from "@/components/form/SubmitBtn";
import Modal from "@/components/modals/Modal";
import { FORM_CONFIG, RESET_PASSWORD } from "@/constants/auth.constant";
import { resetPasswordSchema } from "@/schemas/resetPassword.schema";
import { authService } from "@/services/auth.service";
import type { FormData } from "@/types/form.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const SUBMIT_BTN = FORM_CONFIG.SUBMIT_BTN;
  const LABEL = FORM_CONFIG.LABEL;
  const TITLE = FORM_CONFIG.TITLE;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const onSubmit = (formData: Partial<FormData>) => {
    toast.promise(authService.resetPassword(token!, formData), {
      loading: RESET_PASSWORD.LOADING,
      error() {
        setIsLoading(false);
        return RESET_PASSWORD.ERROR;
      },
      success() {
        setIsLoading(false);
        setIsOpen(true);
        reset();
        return RESET_PASSWORD.SUCCESS;
      },
    });
  };
  return (
    <>
      <div className="max-w-160 w-full mx-auto mt-6 h-screen flex flex-col items-center justify-center">
        <div className="p-6 border rounded-lg shadow-lg w-full">
          <h1 className="text-center mb-7 font-semibold text-(--primary-text) text-xl">
            Reset your password
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-180 w-full flex flex-col gap-4"
          >
            <Password
              title={TITLE.NEW_PASSWORD}
              label={LABEL.NEW_PASSWORD}
              register={register("password")}
              errorStatus={errors.password?.message ? true : false}
            />
            {errors.password?.message && (
              <p className="text-red-500 -mt-3">{errors.password.message}</p>
            )}
            <Password
              title={TITLE.NEW_CONFIRM_PASSWORD}
              label={LABEL.NEW_CONFIRM_PASSWORD}
              register={register("confirmPassword")}
              errorStatus={errors.confirmPassword?.message ? true : false}
            />
            {errors.confirmPassword?.message && (
              <p className="text-red-500 -mt-3">
                {errors.confirmPassword.message}
              </p>
            )}
            <div className="mt-2 flex flex-col gap-3">
              <SubmitBtn
                content={SUBMIT_BTN.RESET_PASSWORD.TEXT}
                style={SUBMIT_BTN.RESET_PASSWORD}
                disabled={!isValid || isSubmitting}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </div>
          </form>
        </div>
      </div>
      {isOpen && (
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <NotifyRedirectLogin onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}
