'use client';

import { FormField } from '@/types/form';
import { SortableFormField } from '../sortable-form-field';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface FormFieldListProps {
  fields: FormField[];
  onFieldsChange: (fields: FormField[]) => void;
  selectedFieldId?: string;
  onFieldSelect: (field: FormField) => void;
  onAddField: (type: string, afterId?: string) => void;
  themeSettings?: any;
}

export function FormFieldList({
  fields,
  onFieldsChange,
  selectedFieldId,
  onFieldSelect,
  onAddField,
  themeSettings,
}: FormFieldListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);

      const newFields = [...fields];
      const [removed] = newFields.splice(oldIndex, 1);
      newFields.splice(newIndex, 0, removed);

      onFieldsChange(newFields);
    }
  };

  return (
    <div className="space-y-[var(--theme-spacing)]">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          {fields.map((field) => (
            <SortableFormField
              key={field.id}
              field={field}
              onDelete={(id) => {
                onFieldsChange(fields.filter((f) => f.id !== id));
              }}
              onFieldChange={(value) => {
                if (typeof value === 'string') {
                  onFieldsChange(
                    fields.map((f) =>
                      f.id === field.id ? { ...f, content: value } : f
                    )
                  );
                } else {
                  onFieldsChange(
                    fields.map((f) =>
                      f.id === field.id ? { ...f, ...value } : f
                    )
                  );
                }
              }}
              isSelected={field.id === selectedFieldId}
              onSelect={() => onFieldSelect(field)}
              onAddField={(type) => onAddField(type, field.id)}
              themeSettings={themeSettings}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}