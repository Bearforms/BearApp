'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronsUpDown, Plus } from 'lucide-react';
import { useWorkspaceStore } from '@/stores/workspace-store';
import { WorkspaceIcon } from './workspace-icon';
import { WorkspaceItem } from './workspace-item';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/stores/sidebar-store';
import { useWorkspaces } from '@/hooks/use-workspaces';

export function WorkspaceDropdown() {
  const { activeWorkspace, setActiveWorkspace } = useWorkspaceStore();
  const { isOpen } = useSidebarStore();

  const {workspaces} = useWorkspaces();  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'h-10 gap-2 transition-all duration-300 ease-in-out border',
            isOpen ? 'w-full px-3 justify-start' : 'w-10 p-0 justify-center',
            'hover:bg-neutral-100',
            'data-[state=open]:bg-neutral-100'
          )}
        >
          <WorkspaceIcon workspace={activeWorkspace} />
          {isOpen && (
            <>
              <span className="text-sm font-normal flex-1 text-left truncate">
                {activeWorkspace.name}
              </span>
              <ChevronsUpDown
                className="h-4 w-4 text-neutral-500 flex-shrink-0"
                strokeWidth={2}
              />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={isOpen ? 'start' : 'center'}
        side={isOpen ? 'bottom' : 'right'}
        className="w-[240px] bg-white"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-xs font-medium text-neutral-500">
          Workspaces
        </DropdownMenuLabel>
        <ScrollArea className="h-fit max-h-[320px] overflow-y-auto">
          <div className="p-1">
            {workspaces.map((workspace) => (
              <WorkspaceItem
                key={workspace.id}
                workspace={workspace}
                isActive={workspace.id === activeWorkspace.id}
                onClick={() => {
                  // setActiveWorkspace(workspace);
                }}
              />
            ))}
          </div>
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2 py-2 px-2 cursor-pointer">
          <Plus className="h-5 w-5 text-neutral-500" strokeWidth={2} />
          <span className="text-sm">Create workspace</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
