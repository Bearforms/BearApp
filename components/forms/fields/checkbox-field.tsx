'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { BaseField } from './base-field';
import { FormField } from '@/types/form';

interface CheckboxFieldProps {
  field: FormField;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  value?: boolean;
  onChange?: (value: boolean) => void;
}

export function CheckboxField({
  field,
  showLabel = true,
  showHelperText = true,
  preview = false,
  value = false,
  onChange,
}: CheckboxFieldProps) {
  return (
    <BaseField
      field={field}
      showLabel={showLabel}
      showHelperText={showHelperText}
      preview={preview}
    >
      <div className="flex items-center gap-2">
        <Checkbox
          id={field.id}
          checked={value}
          onCheckedChange={onChange}
          className={cn(
            'checkbox h-5 w-5 border-[1.5px]',
            'data-[state=checked]:border-[var(--form-primary)]',
            'data-[state=checked]:bg-[var(--form-primary)]'
          )}
          required={field.validation?.required}
          disabled={preview && !onChange}
        />
        <label
          htmlFor={field.id}
          className="text-sm select-none cursor-pointer form-body"
        >
          {field.settings?.checkboxText || 'Checkbox description'}
        </label>
      </div>
    </BaseField>
  );
}
