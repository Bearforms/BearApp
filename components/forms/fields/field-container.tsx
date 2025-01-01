'use client';

import { FormField } from '@/types/form';
import { cn } from '@/lib/utils';

interface FieldContainerProps {
  field: FormField;
  children: React.ReactNode;
  className?: string;
  isSelected?: boolean;
  isContentField?: boolean;
}

export function FieldContainer({
  field,
  children,
  className,
  isSelected,
  isContentField,
}: FieldContainerProps) {
  const isContentType = field.type === 'heading' || field.type === 'paragraph';

  return (
    <div
      className={cn(
        'group relative rounded-md p-2 transition-colors',
        !isContentType && 'bg-[hsl(var(--muted))]',
        isSelected && 'bg-[hsl(var(--muted))]',
        className
      )}
    >
      {children}
    </div>
  );
}
