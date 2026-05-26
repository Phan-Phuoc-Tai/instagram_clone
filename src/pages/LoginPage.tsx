import SubmitBtn from "../components/form/SubmitBtn";
import Email from "../components/form/Email";
import MetaLogo from "../components/icons/MetaLogo";
import ins_bg from "/images/ins_image.webp";
import ins_logo from "/images/instagram-colorful.svg";
import Password from "../components/form/Password";
import { FORM_CONFIG, FORM_LOGIN } from "@/constants/auth.constant";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/login.schema";
import { toast } from "sonner";
import { authService } from "@/services/auth.service";
import type { FormData } from "@/types/form.type";
import { useState } from "react";
import { CONFIG } from "@/constants/config.constant";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const SUBMIT_BTN = FORM_CONFIG.SUBMIT_BTN;
  const LABEL = FORM_CONFIG.LABEL;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = (formData: Partial<FormData>) => {
    toast.promise(authService.login(formData), {
      loading: FORM_LOGIN.LOADING,
      error() {
        setIsLoading(false);
        return FORM_LOGIN.ERROR;
      },
      success(data) {
        const { tokens } = data;
        setIsLoading(false);
        navigate(CONFIG.HOME);
        reset();
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
        return FORM_LOGIN.SUCCESS;
      },
    });
  };

  return (
    <div className="flex h-screen">
      <div className="py-12 px-8  flex-1.5 w-full">
        <img
          src={ins_logo}
          alt="ins_logo"
          className="w-20 h-20 object-center ml-5"
        />
        <p className="mt-7 text-[53px] text-(--primary-text) text-center font-normal">
          See everyday moments from <br />
          <span>your </span>
          <span className="bg-[linear-gradient(90deg,#ff5c00,#ff0069,#d300c5)] bg-clip-text text-transparent text-wrap">
            close friends
          </span>
          .
        </p>
        <div className="flex items-center justify-center">
          <img
            src={ins_bg}
            alt="ins image"
            className="object-contain h-143.75 w-full"
          />
        </div>
      </div>

      <div className="border-l-2 border-(--divider) px-13 flex-1 flex flex-col justify-center">
        <h1 className="mb-7 font-semibold text-(--primary-text) text-[17px]">
          Log in to Instagram
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-136.5 flex flex-col gap-4"
        >
          <Email
            label={LABEL.EMAIL}
            register={register("email")}
            errorStatus={errors.email?.message ? true : false}
          />
          {errors.email?.message && (
            <p className="text-red-500 -mt-4">{errors.email.message}</p>
          )}
          <Password
            label={LABEL.PASSWORD}
            register={register("password")}
            errorStatus={errors.password?.message ? true : false}
          />
          {errors.password?.message && (
            <p className="text-red-500 -mt-4">{errors.password.message}</p>
          )}
          <div className="mt-2 flex flex-col gap-3">
            <SubmitBtn
              content={SUBMIT_BTN.LOG_IN.TEXT}
              style={SUBMIT_BTN.LOG_IN}
              disabled={!isValid || isSubmitting}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            <SubmitBtn
              content={SUBMIT_BTN.FORGOT_PASSWORD.TEXT}
              style={SUBMIT_BTN.FORGOT_PASSWORD}
              linkTo={CONFIG.FORGOT_PASSWORD}
            />
          </div>
          <div className="pt-7.5 flex flex-col gap-3">
            <SubmitBtn
              content={SUBMIT_BTN.LOGIN_WITH_FB.TEXT}
              style={SUBMIT_BTN.LOGIN_WITH_FB}
            />
            <SubmitBtn
              content={SUBMIT_BTN.CREATE_ACCOUNT.TEXT}
              style={SUBMIT_BTN.CREATE_ACCOUNT}
              linkTo={CONFIG.REGISTER}
            />
          </div>
          <MetaLogo />
        </form>
      </div>
    </div>
  );
}
