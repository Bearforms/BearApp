'use client';

import { Textarea } from '@/components/ui/textarea';
import { BaseField } from './base-field';
import { FormField } from '@/types/form';
import { cn } from '@/lib/utils';
import { useAutoResizeTextarea } from '@/hooks/use-auto-resize-textarea';

interface TextareaFieldProps {
  field: FormField;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

export function TextareaField({
  field,
  showLabel = true,
  showHelperText = true,
  preview = false,
  value = '',
  onChange,
  error,
}: TextareaFieldProps) {
  const shouldShowPlaceholder = field.settings?.showPlaceholder !== false;
  const placeholder = shouldShowPlaceholder
    ? field.placeholder || 'Enter text'
    : undefined;

  const maxLength = field.validation?.maxLength;
  const currentLength = value.length;
  const textareaRef = useAutoResizeTextarea(value);

  return (
    <BaseField
      field={field}
      showLabel={showLabel}
      showHelperText={showHelperText}
      preview={preview}
      error={error}
    >
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          required={field.validation?.required}
          maxLength={maxLength}
          className={cn(
            'resize-none min-h-[100px] placeholder:text-[var(--form-text-secondary)] form-body',
            error && [
              'border-red-500',
              'focus-visible:ring-red-500',
              'pr-10', // Make space for error icon
            ],
            maxLength && 'mb-6' // Space for character count
          )}
          disabled={preview && !onChange}
        />
        {maxLength && (
          <div className="absolute bottom-1.5 right-2 text-sm text-muted-foreground">
            {currentLength}/{maxLength}
          </div>
        )}
      </div>
    </BaseField>
  );
}
