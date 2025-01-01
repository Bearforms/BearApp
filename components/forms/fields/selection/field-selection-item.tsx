'use client';

import { LucideIcon } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface FieldSelectionItemProps {
  icon: LucideIcon;
  label: string;
  description: string;
  onClick: () => void;
}

export function FieldSelectionItem({
  icon: Icon,
  label,
  description,
  onClick
}: FieldSelectionItemProps) {
  return (
    <DropdownMenuItem
      onClick={onClick}
      className="flex items-start gap-2 py-3 cursor-pointer"
    >
      <Icon className="h-4 w-4 mt-0.5 text-neutral-500" strokeWidth={2} />
      <div>
        <span className="font-medium block">{label}</span>
        <span className="text-sm text-muted-foreground">{description}</span>
      </div>
    </DropdownMenuItem>
  );
}