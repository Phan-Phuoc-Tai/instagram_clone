import { MESSAGE_CONFIG } from "@/constants/message.constant";
import MessageIcon from "../icons/MessageIcon";
import { Button } from "../ui/button";
export default function Intro() {
  const INTRO = MESSAGE_CONFIG.INTRO;
  return (
    <div className="flex items-center justify-center flex-col">
      <div>
        <MessageIcon
          isActive={false}
          className="w-24 h-24 flex items-center justify-center border-2 rounded-full border-(--ig-primary-text)"
          style={{
            width: "40",
            height: "40",
          }}
        />
      </div>
      <p className="pt-5 text-(--ig-primary-text) text-xl leading-6.25 font-normal">
        {INTRO.YOUR_MESSAGE}
      </p>
      <p className="pt-4 text-(--ig-secondary-text) text-sm leading-4.5 font-normal">
        {INTRO.DESCRIPTION}
      </p>
      <Button className="mt-5 bg-(--ig-primary-bg-btn) hover:bg-(--ig-primary-bg-btn-hover) cursor-pointer">
        {INTRO.SEND_MESSAGE_BTN}
      </Button>
    </div>
  );
}
