import { FOOTER_CONFIG } from "@/constants/footer.constant";
import { ChevronDown } from "lucide-react";
import CopyRight from "./CopyRight";

export default function Footer() {
  const LIST = FOOTER_CONFIG.LIST;
  return (
    <div className="border-t-2 py-6">
      <ul className="flex items-center justify-center gap-4  pb-3  text-(--secondary-text) text-xs">
        {LIST.map((item, index) => (
          <li key={index} className="hover:underline cursor-pointer">
            {item}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center gap-1 text-(--secondary-text) text-xs">
          <span>English (UK)</span>
          <ChevronDown
            style={{
              width: 16,
              height: 16,
            }}
          />
        </div>
        <div className="text-(--secondary-text) text-xs">
          <CopyRight />
        </div>
      </div>
    </div>
  );
}
