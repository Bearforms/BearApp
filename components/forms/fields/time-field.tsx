'use client';

import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { BaseField } from './base-field';
import { FormField } from '@/types/form';
import { TimePicker } from './time/time-picker';

interface TimeFieldProps {
  field: FormField;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

export function TimeField({
  field,
  showLabel = true,
  showHelperText = false,
  preview = false,
  value,
  onChange,
  error,
}: TimeFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const formattedTime = value || field.placeholder || 'Select time';

  return (
    <BaseField
      field={field}
      showLabel={showLabel}
      showHelperText={showHelperText}
      error={error}
    >
      <div className="relative">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'time-field_button bg-[var(--form-background)] hover:bg-[var(--form-background)] hover:text-[var(--form-text)] w-full justify-start text-left font-normal placeholder:text-[var(--form-text-secondary)] pl-9 form-body',
                !value && 'text-[var(--form-text)]',
                error && [
                  'border-red-500',
                  'focus-visible:ring-red-500',
                  'pr-10',
                ]
              )}
              disabled={preview && !onChange}
            >
              <Clock
                className="h-4 w-4 absolute left-3 top-3 text-[var(--form-text-secondary)]"
                strokeWidth={2}
              />
              {formattedTime}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4 bg-white" align="start">
            <TimePicker
              value={value}
              onChange={onChange}
              onClose={() => setIsOpen(false)}
            />
          </PopoverContent>
        </Popover>
      </div>
    </BaseField>
  );
}
