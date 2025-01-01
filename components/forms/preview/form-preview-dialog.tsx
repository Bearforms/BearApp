'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';

interface FormPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function FormPreviewDialog({
  open,
  onOpenChange,
  children,
}: FormPreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-11/12 lg:w-8/12 max-h-[90%] gap-0 p-0 border-0 shadow-lg rounded-md overflow-hidden flex flex-col bg-[var(--form-background)]">
        {children}
      </DialogContent>
    </Dialog>
  );
}
