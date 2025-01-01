'use client';

import { FormField } from '@/types/form';
import { BaseField } from './base-field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface DropdownFieldProps {
  field: FormField;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
}

export function DropdownField({
  field,
  showLabel = true,
  showHelperText = false,
  preview = false,
  value,
  onChange,
  disabled = false,
  error,
}: DropdownFieldProps) {
  const shouldShowPlaceholder = field.settings?.showPlaceholder !== false;
  const options = field.options || [];

  return (
    <BaseField
      field={field}
      showLabel={showLabel}
      showHelperText={showHelperText}
    >
      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled || (preview && !onChange)}
      >
        <SelectTrigger
          className={cn(
            'select-trigger w-full form-body bg-[var(--form-background)]',
            error && 'border-red-500 focus:ring-red-500'
          )}
        >
          <SelectValue
            placeholder={
              shouldShowPlaceholder ? field.placeholder : 'Select an option'
            }
          />
        </SelectTrigger>
        <SelectContent className={cn('bg-white')}>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="cursor-pointer form-body"
            >
              {option.label || 'Enter option name'}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </BaseField>
  );
}
