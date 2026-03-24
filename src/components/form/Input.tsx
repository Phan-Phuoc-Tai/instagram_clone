import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from "react";
import { cn } from "../../lib/utils";
import { Eye, EyeOff } from "lucide-react";
import type { InputForm } from "../../types/authForm/authForm";

export default function Input({
  type,
  title,
  label,
  showPassword,
  focus,
}: InputForm) {
  const [isInputActive, setInputActive] = useState(false);
  const [value, setValue] = useState("");
  const [isShowPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleInputActive = (e: MouseEvent) => {
    e.stopPropagation();
    setInputActive(true);
    if (focus) {
      inputRef.current?.focus();
    }
  };
  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  useEffect(() => {
    if (focus) {
      inputRef.current?.focus();
    }
    const handleCancelActive = () => {
      setInputActive(false);
      inputRef.current?.blur();
    };
    document.addEventListener("click", handleCancelActive);
    return () => {
      if (focus) {
        setInputActive(true);
      }
      document.removeEventListener("click", handleCancelActive);
    };
  }, [value]);
  return (
    <div>
      {title && <h2>{title}</h2>}
      <div
        onClick={handleInputActive}
        className={cn(
          " h-[60px] px-4 py-2.5 border border-(--border-input-form) rounded-2xl flex items-end relative cursor-text hover:border-(--border-focus)",
          isInputActive && "border-(--border-focus)",
        )}
      >
        <input
          type={isShowPassword ? "text" : type}
          value={value}
          onChange={handleChangeValue}
          ref={inputRef}
          className="w-full pr-4 outline-none border-none text-[15px] text-(--primary-text) font-medium"
        />
        <label
          className={cn(
            "absolute top-[18px] left-4 w-max font-medium text-[15px] text-(--placeholder-text) select-none cursor-text transition-all duration-200",
            (isInputActive || value) &&
              "top-[2.5px] font-normal leading-4 text-sm",
          )}
        >
          {label}
        </label>
        {showPassword && value && (
          <div
            onClick={() => setShowPassword(!isShowPassword)}
            className="flex items-center justify-center h-full cursor-pointer"
          >
            {isShowPassword ? <Eye /> : <EyeOff />}
          </div>
        )}
      </div>
    </div>
  );
}

/* Chức năng hiện có:
- Click vào field sẽ focus input, label di chuyển và nhỏ size chữ
- Click vào vị trí khác sẽ blur input, nếu có value label giữ nguyên, ngược lại sẽ về lại vị trí ban đầu
- Show/hide password
*/
