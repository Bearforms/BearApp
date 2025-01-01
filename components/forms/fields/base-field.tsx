'use client';

import { cn } from '@/lib/utils';
import { FormField } from '@/types/form';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';

interface BaseFieldProps {
  field: FormField;
  children: React.ReactNode;
  className?: string;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  error?: string;
}

export function BaseField({
  field,
  children,
  className,
  showLabel = true,
  showHelperText = true,
  preview = false,
  error,
}: BaseFieldProps) {
  const shouldShowLabel = showLabel && field.settings?.showLabel !== false;
  const shouldShowHelperText = showHelperText && field.settings?.showHelperText;

  return (
    <div className={cn('space-y-2', className)}>
      {shouldShowLabel && (
        <div className="space-y-1">
          <Label
            className={cn(
              'form-field-label form-body text-base block',
              !field.label && 'text-neutral-400 italic'
            )}
          >
            {field.label || 'No label provided'}
            {field.validation?.required && (
              <span className="text-red-500 ml-0.5">*</span>
            )}
          </Label>

          {shouldShowHelperText && field.helperText && (
            <p className="helper-text text-sm form-body">{field.helperText}</p>
          )}
        </div>
      )}

      <div className="relative">
        {children}
        {error && (
          <AlertCircle
            className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500 z-10"
            strokeWidth={2}
          />
        )}
      </div>

      {error && <p className="text-sm text-red-500 px-1">{error}</p>}
    </div>
  );
}
