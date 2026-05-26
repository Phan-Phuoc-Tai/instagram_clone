import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type React from "react";
type Props = {
  title?: string;
  styleTitle?: string;
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
};
export default function Modal({
  title,
  styleTitle,
  children,
  open,
  onClose,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          {title && <DialogTitle className={styleTitle}>{title}</DialogTitle>}
          <DialogDescription asChild>
            <div>{children}</div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
