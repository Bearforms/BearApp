'use client';

import { FormField } from '@/types/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useAutoResizeTextarea } from '@/hooks/use-auto-resize-textarea';

interface ParagraphFieldProps {
  field: FormField;
  onFieldChange?: (value: string) => void;
  preview?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export function ParagraphField({
  field,
  onFieldChange,
  preview = false,
  value,
  onChange,
}: ParagraphFieldProps) {
  const textareaRef = useAutoResizeTextarea(value ?? field.content ?? '');

  if (preview) {
    return (
      <p className="form-body text-[var(--form-text)]">
        {value || field.content}
      </p>
    );
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
      placeholder="Enter text"
      className={cn(
        'form-description w-full form-body',
        'px-0 py-0 text-base border-0 focus-visible:ring-0 focus:outline-none focus-visible:ring-offset-0 bg-transparent resize-none',
        'min-h-0'
      )}
    />
  );
}
