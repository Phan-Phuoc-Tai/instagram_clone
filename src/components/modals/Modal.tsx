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
  styleContent?: string;
};
export default function Modal({
  title,
  styleTitle,
  children,
  open,
  onClose,
  styleContent,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={styleContent}>
        <DialogHeader>
          {title && <DialogTitle className={styleTitle}>{title}</DialogTitle>}
          <DialogDescription asChild>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
