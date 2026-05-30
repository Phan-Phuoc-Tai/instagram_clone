import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type React from "react";
type Props = {
  title?: string | null;
  styleTitle?: string;
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
  widthContent?: string;
};
export default function Modal({
  title,
  styleTitle,
  children,
  open,
  onClose,
  widthContent,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={widthContent}>
        <DialogHeader>
          {title && <DialogTitle className={styleTitle}>{title}</DialogTitle>}
          <DialogDescription asChild>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
