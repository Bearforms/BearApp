'use client';

import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function FormPreviewHeader() {
  return (
    <DialogHeader className="h-12 min-h-12 px-5 flex-shrink-0 flex text-left bg-white border-b sticky top-0 z-50">
      <DialogTitle className="font-medium text-base my-auto">
        Form preview
      </DialogTitle>
    </DialogHeader>
  );
}
