'use client';

import { FormField } from '@/types/form';
import { cn } from '@/lib/utils';
import { useFormStore } from '@/stores/form-store';

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

  const form = useFormStore(state => state.form);

  const primaryColor = form?.themeSettings?.colors?.text ?? "#f3f4f6";
  
  const getRGBA = () => {
    const r = parseInt(primaryColor.slice(1, 3), 16);
    const g = parseInt(primaryColor.slice(3, 5), 16);
    const b = parseInt(primaryColor.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${.10})`;
  };
  const hoverStyles = `
    .hover-preview:hover,
    .hover-preview:focus,
    .hover-preview:active
    {
      background-color: ${getRGBA()};
    }
  `;


  return (
    <>
      <style>{hoverStyles}</style>
      <div
        className={cn(
          'hover-preview group relative rounded-md transition-colors',
          isContentType ? 'px-3 py-1.5' : 'p-3',
          `hover:bg-[${primaryColor}] focus-visible-only`,
          isSelected && 'bg-[hsl(var(--muted))]',
          className
        )}
      >
        {children}
      </div>
    </>
  );
}
