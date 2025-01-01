'use client';

import { FormField } from '@/types/form';
import { RichTextEditor } from './rich-text-editor';
import { RichTextPreview } from './rich-text-preview';
import { cn } from '@/lib/utils';

interface RichTextFieldProps {
  field: FormField;
  preview?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onFieldChange?: (value: string) => void;
}

export function RichTextField({
  field,
  preview = false,
  value,
  onChange,
  onFieldChange,
}: RichTextFieldProps) {
  const handleChange = (newValue: string) => {
    // Update both the form data and field content
    onChange?.(newValue);
    onFieldChange?.(newValue);

    // Also update the field content directly
    if (field) {
      field.content = newValue;
    }
  };

  // Use field content as fallback if no value provided
  const displayValue = value ?? field.content ?? '';

  return (
    <div className="form-body">
      {preview ? (
        <RichTextPreview content={displayValue} />
      ) : (
        <RichTextEditor
          value={displayValue}
          onChange={handleChange}
          disabled={false}
        />
      )}
    </div>
  );
}