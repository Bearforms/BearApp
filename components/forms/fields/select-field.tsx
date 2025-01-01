'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { BaseField } from './base-field';
import { FormField } from '@/types/form';

interface SelectFieldProps {
  field: FormField;
  showLabel?: boolean;
  preview?: boolean;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  error?: string;
}

export function SelectField({
  field,
  showLabel = true,
  preview = false,
  value,
  onChange,
  error,
}: SelectFieldProps) {
  const isMulti = field.type === 'multi-select';
  const options = field.options || [];
  const minSelections = field.validation?.min;
  const maxSelections = field.validation?.max;

  const getSelectionText = () => {
    if (minSelections && maxSelections) {
      return `Select between ${minSelections} and ${maxSelections} options`;
    }
    if (minSelections) {
      return `Select at least ${minSelections} options`;
    }
    if (maxSelections) {
      return `Select up to ${maxSelections} options`;
    }
    return '';
  };

  const combinedHelperText = isMulti
    ? [field.helperText, getSelectionText()].filter(Boolean).join(' • ')
    : field.helperText;

  return (
    <BaseField
      field={{
        ...field,
        helperText: combinedHelperText,
      }}
      showLabel={showLabel}
      showHelperText={true}
      error={error}
    >
      {options.length === 0 && (
        <div className="text-sm text-muted-foreground form-body text-[var(--form-text)]">
          Add options in field settings
        </div>
      )}

      {isMulti ? (
        <div
          className={cn(
            'grid gap-2 form-body',
            error && 'pr-10' // Make space for error icon
          )}
        >
          {options.map((option, index) => {
            const checkboxId = `${field.id}-${index}-multi-${option.value}`;
            return (
              <div key={checkboxId} className="flex items-center gap-3">
                <Checkbox
                  id={checkboxId}
                  className={cn(
                    'checkbox placeholder:text-[var(--form-text-secondary)] h-5 w-5 border-[1.5px]',
                    error ? 'border-red-500' : 'border-neutral-300',
                    'data-[state=checked]:border-[var(--theme-primary)]',
                    'data-[state=checked]:bg-[var(--theme-primary)]',
                    'bg-[var(--form-background)]'
                  )}
                  checked={Array.isArray(value) && value.includes(option.value)}
                  onCheckedChange={(checked) => {
                    if (!onChange) return;
                    const currentValues = Array.isArray(value) ? value : [];
                    const newValues = checked
                      ? [...currentValues, option.value]
                      : currentValues.filter((v) => v !== option.value);
                    onChange(newValues);
                  }}
                  required={field.validation?.required}
                  disabled={preview && !onChange}
                />
                <label
                  htmlFor={checkboxId}
                  className="text-sm text-neutral-700 select-none cursor-pointer"
                >
                  {option.label || 'Enter option name'}
                </label>
              </div>
            );
          })}
        </div>
      ) : (
        <RadioGroup
          value={value as string}
          onValueChange={onChange as (value: string) => void}
          disabled={preview && !onChange}
          className={cn(
            'grid gap-2',
            error && 'pr-10' // Make space for error icon
          )}
        >
          {options.map((option, index) => {
            const radioId = `${field.id}-${index}-single-${option.value}`;
            return (
              <div key={radioId} className="flex items-center gap-3 form-body">
                <RadioGroupItem
                  value={option.value}
                  id={radioId}
                  required={field.validation?.required}
                  className={cn(
                    'h-5 w-5 border-[1.5px] form-body',
                    error ? 'border-red-500' : 'border-neutral-300',
                    'text-[var(--theme-primary)]',
                    'data-[state=checked]:border-[var(--theme-primary)]',
                    'data-[state=checked]:bg-[var(--theme-primary)]',
                    'bg-[var(--form-background)]',
                    '[&_span]:rounded-full !rounded-full',
                    '[&_span]:after:rounded-full'
                  )}
                />
                <label
                  htmlFor={radioId}
                  className="text-sm text-neutral-700 select-none cursor-pointer form-body"
                >
                  {option.label || 'Enter option name'}
                </label>
              </div>
            );
          })}
        </RadioGroup>
      )}
    </BaseField>
  );
}
