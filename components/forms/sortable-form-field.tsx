'use client';

import { Button } from '@/components/ui/button';
import { Settings2, Trash2, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormField as IFormField } from '@/types/form';
import { FormField } from './form-field';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FieldContainer } from './field-container';
import { formElements } from '@/lib/constants/form-elements';
import { FieldSelectionDropdown } from './fields/selection/field-selection-dropdown';
import { Plus } from 'lucide-react';

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

  // Find field definition to check if settings should be hidden
  const fieldDef = formElements
    .flatMap((category) => category.items)
    .find((item) => item.type === field.type);

  const showSettings = !fieldDef?.hideSettings;

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

        <div
          className={cn(
            'absolute -top-9 right-0 flex items-center gap-0 opacity-0 transition-opacity bg-white border-[0.5px] border-neutral-200 shadow-sm rounded-md overflow-hidden p-0.5 group-focus:opacity-100',
            'group-hover:opacity-100 group-focus:opacity-100'
          )}
        >
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-sm cursor-grab active:cursor-grabbing focus-visible:outline-offset-0"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-5 w-5 text-neutral-500" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-sm focus-visible:outline-offset-0"
            onClick={() => onDelete(field.id)}
          >
            <Trash2 className="h-5 w-5 text-neutral-500" />
          </Button>
          {showSettings && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-sm focus-visible:outline-offset-0"
              onClick={() => onSelect?.(field)}
            >
              <Settings2 className="h-5 w-5 text-neutral-500" />
            </Button>
          )}
          <FieldSelectionDropdown
            onSelect={(type) => onAddField?.(type, field.id)}
            triggerClassName="h-8 w-8 p-0 rounded-sm focus-visible:outline-offset-0"
            label={<Plus className="h-5 w-5 text-neutral-500" />}
          />
        </div>
      </FieldContainer>
    </div>
  );
}
