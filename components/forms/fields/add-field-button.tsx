'use client';

import { Plus } from 'lucide-react';
import { FieldSelectionDropdown } from './selection/field-selection-dropdown';

interface AddFieldButtonProps {
  onAddField: (type: string) => void;
}

export function AddFieldButton({ onAddField }: AddFieldButtonProps) {
  return (
    <FieldSelectionDropdown
      onSelect={onAddField}
      triggerClassName="w-full h-10 border border-dashed border-[var(--form-border)] bg-[var(--form-background)]"
      contentClassName="w-72 form-body"
      label={
        <>
          <Plus className="h-4 w-4 mr-2" />
          Add field
        </>
      }
    />
  );
}
