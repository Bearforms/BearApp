'use client';

import { FormField } from '@/types/form';
import { cn } from '@/lib/utils';

interface FieldWrapperProps {
  field: FormField;
  children: React.ReactNode;
  className?: string;
  isSelected?: boolean;
  isContentField?: boolean;
  onSettingsClick?: () => void;
}

export function FieldWrapper({
  field,
  children,
  className,
  isSelected,
  isContentField,
  onSettingsClick,
}: FieldWrapperProps) {
  return (
    <div
      className={cn(
        'group relative rounded-md p-2 transition-colors',
        !isContentField && 'hover:bg-[hsl(var(--muted))]',
        isSelected && 'bg-[hsl(var(--muted))]',
        className
      )}
      onClick={(e) => {
        e.stopPropagation(); // Always stop propagation
        if (!isContentField && onSettingsClick) {
          onSettingsClick();
        }
      }}
    >
      {children}
    </div>
  );
}
