import Email from "@/components/form/Email";
import Password from "@/components/form/Password";
import SubmitBtn from "@/components/form/SubmitBtn";
import Text from "@/components/form/Text";
import MetaLogo from "@/components/icons/MetaLogo";
import { Button } from "@/components/ui/button";
import { CONFIG } from "@/constants/config.constant";
import { FORM_CONFIG, FORM_REGISTER } from "@/constants/auth.constant";
import { registerSchema } from "@/schemas/register.schema";
import { authService } from "@/services/auth.service";
import type { FormData } from "@/types/form.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function RegisterPage() {
  const TITLE = FORM_CONFIG.TITLE;
  const LABEL = FORM_CONFIG.LABEL;
  const SUBMIT_BTN = FORM_CONFIG.SUBMIT_BTN;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      fullName: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (formData: Partial<FormData>) => {
    toast.promise(authService.register(formData), {
      loading: FORM_REGISTER.LOADING,
      error() {
        setIsLoading(false);
        return FORM_REGISTER.ERROR;
      },
      success(data) {
        setIsLoading(false);
        navigate(CONFIG.VERIFY_EMAIL, {
          state: {
            email: data.email,
          },
        });
        reset();
        return FORM_REGISTER.SUCCESS;
      },
    });
  };
  return (
    <div className="max-w-150 w-full mx-auto mt-6">
      <div className="flex flex-col items-start gap-1.5 mb-3 -ml-1">
        <Button
          size={null}
          className="-ml-3 w-10 h-10 rounded-full bg-white hover:bg-black/5 text-(--secondary-icon) cursor-pointer"
          onClick={() => navigate(CONFIG.LOGIN)}
        >
          <ChevronLeft style={{ width: 28, height: 28 }} />
        </Button>
        <MetaLogo />
      </div>
      <div className="mb-3">
        <h2 className="text-(--primary-text) text-2xl font-semibold">
          Get started on Instagram
        </h2>
        <p className="text-(--primary-text) text-[15px] font-normal">
          Sign up to see photos and videos from your friends.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full"
      >
        <Email
          title={TITLE.EMAIL}
          label={LABEL.EMAIL_REGISTER}
          register={register("email")}
          errorStatus={errors.email?.message ? true : false}
        />
        {errors.email?.message && (
          <p className="text-red-500 -mt-3">{errors.email.message}</p>
        )}
        <p className="text-base leading-5">
          You may receive notifications from us.{" "}
          <span className="text-(--blue-link) font-bold cursor-default">
            Learn why we ask for your contact information
          </span>
        </p>
        <Password
          title={TITLE.PASSWORD}
          label={LABEL.PASSWORD}
          register={register("password")}
          errorStatus={errors.password?.message ? true : false}
        />
        {errors.password?.message && (
          <p className="text-red-500 -mt-3">{errors.password.message}</p>
        )}
        <Password
          title={TITLE.CONFIRM_PASSWORD}
          label={LABEL.CONFIRM_PASSWORD}
          register={register("confirmPassword")}
          errorStatus={errors.confirmPassword?.message ? true : false}
        />
        {errors.confirmPassword?.message && (
          <p className="text-red-500 -mt-3">{errors.confirmPassword.message}</p>
        )}
        <Text
          title={TITLE.FULL_NAME}
          label={LABEL.FULL_NAME}
          register={register("fullName")}
          errorStatus={errors.fullName?.message ? true : false}
        />
        {errors.fullName?.message && (
          <p className="text-red-500 -mt-3">{errors.fullName.message}</p>
        )}
        <Text
          title={TITLE.USERNAME}
          label={LABEL.USERNAME}
          register={register("username")}
          errorStatus={errors.username?.message ? true : false}
        />
        {errors.username?.message && (
          <p className="text-red-500 -mt-3">{errors.username.message}</p>
        )}
        <div className="text-base flex flex-col gap-2 my-3">
          <p>
            People who use our service may have uploaded your contact
            information to Instagram.{" "}
            <span className="text-(--blue-link) font-bold cursor-default">
              Learn more.
            </span>
          </p>
          <p>
            By tapping Submit, you agree to create an account and to Instagram's{" "}
            <span className="text-(--blue-link) font-bold cursor-default">
              Terms
            </span>
            <span>, </span>
            <span className="text-(--blue-link) font-bold cursor-default">
              Privacy Policy
            </span>
            <span> and </span>
            <span className="text-(--blue-link) font-bold cursor-default">
              Cookies Policy
            </span>
          </p>
          <p>
            The{" "}
            <span className="text-(--blue-link) font-bold cursor-default">
              Learn more.
            </span>{" "}
            describes the ways we can use the information we collect when you
            create an account. For example, we use this information to provide,
            personalize and improve our products, including ads.
          </p>
        </div>
        <SubmitBtn
          content={SUBMIT_BTN.REGISTER.TEXT}
          style={SUBMIT_BTN.REGISTER}
          disabled={!isValid || isSubmitting}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <SubmitBtn
          content={SUBMIT_BTN.ALREADY_ACCOUNT.TEXT}
          style={SUBMIT_BTN.ALREADY_ACCOUNT}
          linkTo={CONFIG.LOGIN}
        />
      </form>
    </div>
  );
}
