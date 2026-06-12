import { Command, CommandDialog } from "@/components/ui/command";
import { Button } from "../ui/button";
import { X } from "lucide-react";
type Props = {
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
  widthContent?: string;
  showCloseBtn: boolean;
};
export default function CommandCustom({
  children,
  open,
  onClose,
  widthContent,
  showCloseBtn,
}: Props) {
  return (
    <>
      <CommandDialog
        open={open}
        onOpenChange={onClose}
        className={`${widthContent} z-1000 overflow-visible`}
      >
        <Command>{children}</Command>
        {showCloseBtn && (
          <Button
            className="fixed -top-6 -right-105 z-1000 bg-transparent text-black hover:bg-red-100 hover:text-red-600 rounded-full h-10 w-10 cursor-pointer "
            onClick={onClose}
          >
            <X
              style={{
                width: 24,
                height: 24,
              }}
            />
          </Button>
        )}
      </CommandDialog>
    </>
  );
}
