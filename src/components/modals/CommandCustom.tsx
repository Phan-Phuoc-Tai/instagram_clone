import { Command, CommandDialog } from "@/components/ui/command";

type Props = {
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
  widthContent?: string;
};
export default function CommandCustom({
  children,
  open,
  onClose,
  widthContent,
}: Props) {
  return (
    <>
      <CommandDialog
        open={open}
        onOpenChange={onClose}
        className={widthContent}
      >
        <Command>{children}</Command>
      </CommandDialog>
    </>
  );
}
