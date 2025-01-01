'use client';

import { cn } from '@/lib/utils';
import { EditableContent } from './fields/editable-content';

interface FormTitleProps {
  title?: string;
  onTitleChange?: (title: string) => void;
  onAddField?: (type: string) => void;
  editable?: boolean;
  headingFont?: string;
}

export function FormTitle({
  title = '',
  onTitleChange,
  onAddField,
  editable = true,
  headingFont = 'var(--theme-heading-font)',
}: FormTitleProps) {
  return (
    <EditableContent
      value={title}
      onChange={onTitleChange}
      onAddField={onAddField}
      placeholder="Untitled form"
      editable={editable}
      className={cn(
        'form-heading form-title text-4xl font-bold overflow-hidden',
        'min-h-0 h-auto'
      )}
    />
  );
}
