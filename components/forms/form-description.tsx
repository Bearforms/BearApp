'use client';

import { cn } from '@/lib/utils';
import { EditableContent } from './fields/editable-content';

interface FormDescriptionProps {
  description?: string;
  onDescriptionChange?: (description: string) => void;
  onAddField?: (type: string) => void;
  editable?: boolean;
}

export function FormDescription({
  description = '',
  onDescriptionChange,
  onAddField,
  editable = true,
}: FormDescriptionProps) {
  return (
    <EditableContent
      value={description}
      onChange={onDescriptionChange}
      onAddField={onAddField}
      placeholder="Form description"
      editable={editable}
      className={cn('form-body form-description')}
    />
  );
}
