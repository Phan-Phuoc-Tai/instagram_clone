import { cn } from "../../lib/utils";
import { Input } from "../ui/input";
import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  title?: string;
  label: string;
  register:
    | UseFormRegisterReturn<"fullName">
    | UseFormRegisterReturn<"username">;
  errorStatus: boolean;
};

export default function Text({ title, label, register, errorStatus }: Props) {
  return (
    <div className="w-full">
      {title && (
        <h2 className="text-(--primary-text) text-[17px] font-semibold">
          {title}
        </h2>
      )}
      <div
        className={cn(
          " h-15 px-4 py-2.5 border border-(--border-input) rounded-2xl flex items-end relative cursor-text hover:border-(--border-focus) active:border-(--border-focus)",
          errorStatus &&
            "border-red-500 active:border-red-500 hover:border-border-red-500",
        )}
      >
        <Input
          type="text"
          placeholder=" "
          className={`peer  focus-visible:ring-0 shadow-none px-0 autofill:shadow-[inset_0_0_0_1000px_#fff] dark:autofill:shadow-[inset_0_0_0_1000px_#09090b] w-full outline-none border-none text-[15px] text-(--primary-text) font-medium h-auto`}
          {...register}
        />
        <label
          className={cn(
            `absolute top-4.5 left-4 w-max font-medium text-[15px] text-(--placeholder-text) select-none cursor-text transition-all duration-200 pointer-events-none peer-focus:top-[2.5px] peer-focus:font-normal peer-focus:leading-4 peer-focus:text-sm peer-[:not(:placeholder-shown)]:top-[2.5px] peer-[:not(:placeholder-shown)]:font-normal peer-[:not(:placeholder-shown)]:leading-4 peer-[:not(:placeholder-shown)]:text-sm `,
            errorStatus && "text-red-500",
          )}
        >
          {label}
        </label>
      </div>
    </div>
  );
}
