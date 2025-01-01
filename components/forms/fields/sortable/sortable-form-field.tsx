'use client';

import { FormField as IFormField } from '@/types/form';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import { FormField } from '../../form-field';
import { FieldContainer } from '../field-container';
import { SortableFieldActions } from './sortable-field-actions';

interface SortableFormFieldProps {
  field: IFormField;
  onDelete: (id: string) => void;
  onFieldChange?: (value: string | IFormField) => void;
  isSelected?: boolean;
  isContentField?: boolean;
  onSelect?: (field: IFormField) => void;
  onAddField?: (type: string, afterId: string) => void;
  themeSettings?: any;
}

export function SortableFormField({
  field,
  onDelete,
  onFieldChange,
  isSelected,
  isContentField,
  onSelect,
  onAddField,
  themeSettings,
}: SortableFormFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isHeadingOrParagraph =
    field.type === 'heading' || field.type === 'paragraph';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(isDragging && 'opacity-50 bg-neutral-50 shadow-lg')}
    >
      <FieldContainer
        field={field}
        isSelected={isSelected}
        isContentField={isContentField}
      >
        <FormField
          field={field}
          onFieldChange={onFieldChange as any}
          preview={false}
          themeSettings={themeSettings}
        />

        <SortableFieldActions
          isHovered={true}
          onDelete={() => onDelete(field.id)}
          onSettings={() => onSelect?.(field)}
          onAddField={(type) => onAddField?.(type, field.id)}
          showSettings={!isHeadingOrParagraph}
          dragHandleProps={{ ...attributes, ...listeners }}
        />
      </FieldContainer>
    </div>
  );
}