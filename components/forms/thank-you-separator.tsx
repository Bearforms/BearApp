'use client';

import { Separator } from '@/components/ui/separator';
import { SplitSquareHorizontal } from 'lucide-react';

export function ThankYouSeparator() {
  return (
    <div className="p-3">
      <div className="relative py-0 flex space-x-1 items-center">
        <Separator className="shrink bg-[var(--theme-border)]" />
        <div className="relative shrink-0 text-center">
          <span className="flex gap-2 items-center px-2 py-1.5 text-sm text-[var(--form-text)] font-medium rounded-full bg-[var(--form-background)]">
            <SplitSquareHorizontal className="text-[var(--form-text-secondary)] h-5 w-5" />
            Thank you page
          </span>
        </div>
        <Separator className="shrink bg-[var(--theme-border)]" />
      </div>
    </div>
  );
}
