'use client';

import { Button } from '@/components/ui/button';
import { Settings2, Trash2, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FieldSelectionDropdown } from '../selection/field-selection-dropdown';

interface SortableFieldActionsProps {
  isHovered: boolean;
  onDelete: () => void;
  onSettings?: () => void;
  onAddField: (type: string) => void;
  showSettings?: boolean;
  dragHandleProps?: any;
}

export function SortableFieldActions({
  isHovered,
  onDelete,
  onSettings,
  onAddField,
  showSettings = true,
  dragHandleProps,
}: SortableFieldActionsProps) {
  return (
    <div
      className={cn(
        'absolute -top-9 right-0 flex items-center gap-0 opacity-0 transition-opacity bg-white border-[0.5px] border-neutral-200 shadow-sm rounded-md overflow-hidden p-0.5',
        'group-hover:opacity-100'
      )}
    >
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 rounded-sm cursor-grab active:cursor-grabbing focus-visible:outline-offset-0"
        {...dragHandleProps}
      >
        <GripVertical className="h-5 w-5 text-neutral-500" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 rounded-sm focus-visible:outline-offset-0"
        onClick={onDelete}
      >
        <Trash2 className="h-5 w-5 text-neutral-500" />
      </Button>
      {showSettings && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 rounded-sm focus-visible:outline-offset-0"
          onClick={onSettings}
        >
          <Settings2 className="h-5 w-5 text-neutral-500" />
        </Button>
      )}
      <FieldSelectionDropdown
        onSelect={onAddField}
        triggerClassName="h-8 w-8 p-0 rounded-sm focus-visible:outline-offset-0"
        contentClassName="w-72"
        label=""
      />
    </div>
  );
}
