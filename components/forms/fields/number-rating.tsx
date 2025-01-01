'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BaseField } from './base-field';
import { FormField } from '@/types/form';

interface NumberRatingProps {
  field: FormField;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  value?: number;
  onChange?: (value: number) => void;
  error?: string;
}

export function NumberRatingField({
  field,
  showLabel = true,
  showHelperText = false,
  preview = false,
  value,
  onChange,
  error,
}: NumberRatingProps) {
  const maxRating = field.settings?.maxRating || 10;
  const showValues = field.settings?.showValues !== false;
  const numbers = Array.from({ length: maxRating }, (_, i) => i + 1);

  return (
    <BaseField
      field={field}
      showLabel={showLabel}
      showHelperText={showHelperText}
      error={error}
    >
      <div
        className={cn(
          'flex flex-wrap gap-2',
          error && 'pr-10' // Make space for error icon
        )}
      >
        {numbers.map((number) => (
          <Button
            key={number}
            type="button"
            variant="outline"
            className={cn(
              'h-10 w-10 p-0 number-field transition-colors form-body',
              'border-[var(--theme-border)]',
              'text-[var(--form-text)]',
              'bg-[var(--form-background)] hover:border-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:text-white active:text-[var(--theme-background)]',
              value === number && [
                'border-[var(--theme-primary)]',
                'text-[var(--theme-background)]',
                'bg-[var(--theme-primary)]',
              ],
              error && [
                'border-red-500',
                'hover:border-red-500',
                'focus-visible:ring-red-500',
              ]
            )}
            onClick={(e) => {
              e.preventDefault();
              onChange?.(number);
            }}
            disabled={preview && !onChange}
          >
            {showValues ? number : ''}
          </Button>
        ))}
      </div>
    </BaseField>
  );
}
