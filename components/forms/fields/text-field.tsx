'use client';

import { Input } from '@/components/ui/input';
import { BaseField } from './base-field';
import { FormField } from '@/types/form';
import { cn } from '@/lib/utils';

interface TextFieldProps {
  field: FormField;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  onFieldChange?: (field: Partial<FormField>) => void;
}

export function TextField({
  field,
  showLabel = true,
  showHelperText = true,
  preview = false,
  value = '',
  onChange,
  error,
  onFieldChange,
}: TextFieldProps) {
  const shouldShowPlaceholder = field.settings?.showPlaceholder !== false;
  const placeholder = shouldShowPlaceholder
    ? field.placeholder || 'Enter text'
    : undefined;

  return (
    <BaseField
      field={field}
      showLabel={showLabel}
      showHelperText={showHelperText}
      preview={preview}
      error={error}
    >
      <Input
        type="text"
        value={value}
        onChange={(e) => {
          if (preview) {
            onChange?.(e.target.value);
          } else if (shouldShowPlaceholder) {
            onFieldChange?.({ placeholder: e.target.value });
          }
        }}
        placeholder={placeholder}
        required={field.validation?.required}
        minLength={field.validation?.minLength}
        maxLength={field.validation?.maxLength}
        pattern={field.validation?.pattern}
        disabled={preview && !onChange}
        onFocus={(e) => !preview && shouldShowPlaceholder && e.target.select()}
        className={cn(
          'w-full placeholder:text-[var(--form-text-secondary)] form-body',
          error && [
            'border-red-500',
            'focus-visible:ring-red-500',
            'pr-10', // Make space for error icon
          ]
        )}
      />
    </BaseField>
  );
}
