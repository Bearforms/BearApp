'use client';

import { FormField } from '@/types/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useAutoResizeTextarea } from '@/hooks/use-auto-resize-textarea';

interface HeadingFieldProps {
  field: FormField;
  onFieldChange?: (value: string) => void;
  preview?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  headingFont?: string;
}

export function HeadingField({
  field,
  onFieldChange,
  preview = false,
  value,
  onChange,
  headingFont,
}: HeadingFieldProps) {
  const level = field.settings?.headingLevel || 2;
  const textareaRef = useAutoResizeTextarea(value ?? field.content ?? '');

  const className = cn(
    'form-heading border-0 font-bold',
    level === 1 && 'text-3xl',
    level === 2 && 'text-2xl',
    level === 3 && 'text-xl'
  );

  if (preview) {
    return <div className={cn(className)}>{value || field.content}</div>;
  }

  return (
    <Textarea
      ref={textareaRef}
      value={value ?? field.content ?? ''}
      onChange={(e) => {
        const newValue = e.target.value;
        onChange?.(newValue);
        onFieldChange?.(newValue);
      }}
      placeholder="Enter heading"
      className={cn(
        className,
        'p-0 form-heading resize-none border-0 focus-visible:ring-0 focus:outline-none focus-visible:ring-offset-0 w-full bg-transparent',
        'min-h-0'
      )}
    />
  );
}
