'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FieldSelectionDropdown } from './selection/field-selection-dropdown';

interface HoverActionsProps {
  isHovered: boolean;
  onAddField: (type: string) => void;
}

export function HoverActions({ isHovered, onAddField }: HoverActionsProps) {
  return (
    <div
      className={cn(
        'absolute -top-9 right-0 opacity-0 transition-opacity bg-white border-[0.5px] border-neutral-200 shadow-sm rounded-md overflow-hidden p-0.5',
        isHovered && 'opacity-100'
      )}
    >
      <FieldSelectionDropdown
        onSelect={onAddField}
        triggerClassName="h-8 w-8 p-0 rounded-sm"
        contentClassName="w-72"
        label=""
      />
    </div>
  );
}
