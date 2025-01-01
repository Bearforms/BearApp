'use client';

import { FormField } from '@/types/form';
import { Separator } from '@/components/ui/separator';
import { SplitSquareHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageBreakProps {
  field: FormField;
  preview?: boolean;
}

export function PageBreak({ field, preview = false }: PageBreakProps) {
  // Don't show page breaks in preview mode
  if (preview) return null;

  return (
    <div className="relative py-0 flex space-x-1 items-center">
      <Separator className="shrink bg-[var(--theme-border)]" />
      <div className="shrink-0 relative text-center">
        <span
          className={cn(
            'flex gap-2 items-center px-2 py-1.5 text-sm font-medium rounded-full bg-transparent',
            field.settings?.stepTitle
              ? 'text-[var(--form-text)]'
              : 'text-[var(--form-text-secondary)]'
          )}
        >
          <SplitSquareHorizontal className="text-[var(--form-text-secondary)] h-5 w-5" />
          {field.settings?.stepTitle || 'Page Break'}
        </span>
      </div>
      <Separator className="shrink bg-[var(--theme-border)]" />
    </div>
  );
}
