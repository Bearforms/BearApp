'use client';

import { Workspace } from '@/types/workspace';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { WorkspaceIcon } from './workspace-icon';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkspaceItemProps {
  workspace: Workspace;
  isActive: boolean;
  onClick: () => void;
}

export function WorkspaceItem({ workspace, isActive, onClick }: WorkspaceItemProps) {
  return (
    <DropdownMenuItem
      className={cn(
        'flex items-center gap-2 py-2 px-2 cursor-pointer justify-between group',
        'focus:bg-neutral-100'
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <WorkspaceIcon workspace={workspace} />
        <span className="text-sm truncate">{workspace.name}</span>
      </div>
      {isActive && (
        <Check 
          className={cn(
            'h-4 w-4 text-neutral-500',
            'group-hover:text-neutral-900'
          )} 
          strokeWidth={2}
        />
      )}
    </DropdownMenuItem>
  );
}