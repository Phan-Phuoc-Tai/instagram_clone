import { useState } from "react";
import { cn } from "../../lib/utils";

import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import type { UseFormRegister } from "react-hook-form";

type Props = {
  title?: string;
  label: string;
  type: "email" | "password";
  register: UseFormRegister<{ email: string; password: string }>;
};
export default function Password({ title, label, type, register }: Props) {
  const [isShowPassword, setShowPassword] = useState(false);
  return (
    <div>
      {title && <h2>{title}</h2>}
      <div
        className={cn(
          " h-15 px-4 py-2.5 border border-(--border-input) rounded-2xl flex items-end relative cursor-text hover:border-(--border-focus) active:border-(--border-focus)",
        )}
      >
        <Input
          type={isShowPassword ? "text" : type}
          placeholder=" "
          className={`peer  focus-visible:ring-0 shadow-none px-0 autofill:shadow-[inset_0_0_0_1000px_#fff] dark:autofill:shadow-[inset_0_0_0_1000px_#09090b] w-full outline-none border-none text-[15px] text-(--primary-text) font-medium h-auto`}
          {...register(type)}
        />
        <label
          className={cn(
            `absolute top-4.5 left-4 w-max font-medium text-[15px] text-(--placeholder-text) select-none cursor-text transition-all duration-200 pointer-events-none peer-focus:top-[2.5px] peer-focus:font-normal peer-focus:leading-4 peer-focus:text-sm peer-[:not(:placeholder-shown)]:top-[2.5px] peer-[:not(:placeholder-shown)]:font-normal peer-[:not(:placeholder-shown)]:leading-4 peer-[:not(:placeholder-shown)]:text-sm `,
          )}
        >
          {label}
        </label>
        <div
          onClick={() => setShowPassword(!isShowPassword)}
          className="items-center justify-center h-full cursor-pointer hidden peer-[:not(:placeholder-shown)]:flex"
        >
          {isShowPassword ? <Eye /> : <EyeOff />}
        </div>
      </div>
    </div>
  );
}
