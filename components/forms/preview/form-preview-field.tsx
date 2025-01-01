'use client';

import { FormField, ThemeSettings } from '@/types/form';
import { FormField as FormFieldComponent } from '../form-field';
import { cn } from '@/lib/utils';
import { shouldShowField } from '@/lib/utils/condition-evaluation';
import { useEffect, useState } from 'react';

interface FormPreviewFieldProps {
  field: FormField;
  themeSettings: ThemeSettings;
  className?: string;
  preview?: boolean;
  value?: any;
  onChange?: (value: any) => void;
  error?: string;
  formData?: Record<string, any>;
  fields?: FormField[];
}

export function FormPreviewField({
  field,
  themeSettings,
  className,
  preview = true,
  value,
  onChange,
  error,
  formData = {},
  fields = [],
}: FormPreviewFieldProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Only evaluate visibility if we have conditions
    const visible = field.settings?.conditions?.length 
      ? shouldShowField(field, formData, fields)
      : true;
    setIsVisible(visible);
  }, [field, formData, fields]);

  if (!isVisible) return null;

  return (
    <div className={cn('form-field', className)}>
      <FormFieldComponent
        field={field}
        themeSettings={themeSettings}
        preview={preview}
        value={value}
        onChange={onChange}
        error={error}
      />
    </div>
  );
}