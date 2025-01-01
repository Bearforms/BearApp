'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { BaseField } from './base-field';
import { FormField } from '@/types/form';

interface FileUploadFieldProps {
  field: FormField;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  value?: FileList | null;
  onChange?: (value: FileList) => void;
  error?: string;
}

export function FileUploadField({
  field,
  showLabel = true,
  showHelperText = false,
  preview = false,
  value,
  onChange,
  error,
}: FileUploadFieldProps) {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const accept = field.settings?.acceptedFileTypes?.join(',');
  const maxSize = field.settings?.maxFileSize;
  const multiple = field.settings?.multiple;

  // Create helper text that includes file types and size limits
  const getHelperText = () => {
    const parts = [];

    // Add original helper text if it exists
    if (field.helperText) {
      parts.push(field.helperText);
    }

    // Add file type restrictions
    if (accept) {
      parts.push(
        `Accepted types: ${field.settings?.acceptedFileTypes?.join(', ')}`
      );
    }

    // Add file size limit
    if (maxSize) {
      parts.push(`Max size: ${maxSize}MB`);
    }

    return parts.join(' • ');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !onChange) return;

    if (maxSize) {
      const invalidFiles = Array.from(files).filter(
        (file) => file.size > maxSize * 1024 * 1024
      );
      if (invalidFiles.length > 0) {
        e.target.value = '';
        return;
      }
    }

    // Update selected files display
    const fileNames = Array.from(files).map((file) => file.name);
    setSelectedFiles(fileNames);

    onChange(files);
  };

  return (
    <BaseField
      field={{
        ...field,
        helperText: getHelperText(),
      }}
      showLabel={showLabel}
      showHelperText={showHelperText}
      error={error}
    >
      <div className="space-y-2">
        <Input
          type="file"
          className={cn(
            'cursor-pointer h-auto p-2 form-body',
            'file:mr-4 file:py-1.5 file:px-3',
            'file:rounded-[var(--form-radius)] file:border-0',
            'file:text-sm file:font-medium',
            'file:bg-secondary file:text-secondary-foreground',
            'file:cursor-pointer hover:file:bg-secondary/80',
            'before:text-sm before:text-neutral-500',
            error && [
              'border-red-500',
              'focus-visible:ring-red-500',
              'pr-10', // Make space for error icon
            ]
          )}
          multiple={multiple}
          accept={accept}
          required={field.validation?.required}
          disabled={preview && !onChange}
          onChange={handleFileChange}
        />

        {selectedFiles.length > 0 && (
          <div className="text-sm text-neutral-600">
            {selectedFiles.map((fileName, index) => (
              <div key={index} className="truncate">
                {fileName}
              </div>
            ))}
          </div>
        )}
      </div>
    </BaseField>
  );
}
