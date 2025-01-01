'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FormField } from '@/types/form';
import { BaseField } from './base-field';

interface DateFieldProps {
  field: FormField;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  value?: Date;
  onChange?: (value: Date | undefined) => void;
  error?: string;
}

export function DateField({
  field,
  showLabel = true,
  showHelperText = false,
  preview = false,
  value,
  onChange,
  error,
}: DateFieldProps) {
  const shouldShowPlaceholder = field.settings?.showPlaceholder !== false;

  return (
    <BaseField
      field={field}
      showLabel={showLabel}
      showHelperText={showHelperText}
      error={error}
    >
      <div className="relative form-body">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'date-field_button w-full justify-start text-left font-normal pl-9 hover:text-[var(--form-text)]',
                !value && 'text-[var(--form-text)]',
                error && [
                  'border-red-500',
                  'focus-visible:ring-red-500',
                  'pr-10', // Make space for error icon
                ]
              )}
              style={{ backgroundColor: 'var(--form-background)' }}
              disabled={preview && !onChange}
            >
              <CalendarIcon
                className="h-4 w-4 absolute left-3 top-3 text-[var(--form-text-secondary)]"
                strokeWidth={2}
              />
              {value
                ? format(value, 'PPP')
                : shouldShowPlaceholder
                ? field.placeholder
                : 'Pick a date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={onChange}
              initialFocus
              required={field.validation?.required}
              disabled={preview && !onChange}
              className="bg-[var(--form-background)]"
            />
          </PopoverContent>
        </Popover>
      </div>
    </BaseField>
  );
}
