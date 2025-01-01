'use client';

import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { BaseField } from './base-field';
import { FormField } from '@/types/form';
import { cn } from '@/lib/utils';

interface EmailFieldProps {
  field: FormField;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

export function EmailField({
  field,
  showLabel = true,
  showHelperText = true,
  preview = false,
  value = '',
  onChange,
  error,
}: EmailFieldProps) {
  const shouldShowPlaceholder = field.settings?.showPlaceholder !== false;
  const placeholder = shouldShowPlaceholder
    ? field.placeholder || 'Enter email address'
    : undefined;

  return (
    <BaseField
      field={field}
      showLabel={showLabel}
      showHelperText={showHelperText}
      preview={preview}
      error={error}
    >
      <div className="relative">
        <Input
          type="email"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'pl-9 placeholder:text-[var(--form-text-secondary)] form-body',
            error && [
              'border-red-500',
              'focus-visible:ring-red-500',
              'pr-10', // Make space for error icon
            ]
          )}
          required={field.validation?.required}
          disabled={preview && !onChange}
        />
        <Mail
          className="h-4 w-4 absolute left-3 top-3 text-[var(--form-text-secondary)]"
          strokeWidth={2}
        />
      </div>
    </BaseField>
  );
}
