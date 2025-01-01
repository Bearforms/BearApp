'use client';

import { DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { FieldSelectionItem } from './field-selection-item';
import { FormElementCategory } from '@/types/form-elements';

interface FieldSelectionCategoryProps {
  category: FormElementCategory;
  onSelect: (type: string) => void;
}

export function FieldSelectionCategory({
  category,
  onSelect
}: FieldSelectionCategoryProps) {
  return (
    <div>
      <DropdownMenuLabel className="text-xs font-medium text-neutral-500">
        {category.category}
      </DropdownMenuLabel>
      {category.items.map((element) => (
        <FieldSelectionItem
          key={element.type}
          icon={element.icon}
          label={element.label}
          description={element.description}
          onClick={() => onSelect(element.type)}
        />
      ))}
    </div>
  );
}