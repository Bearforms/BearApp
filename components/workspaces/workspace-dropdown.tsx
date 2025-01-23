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
import { Box, ChevronsUpDown, Plus } from 'lucide-react';
import { useWorkspaceStore } from '@/stores/workspace-store';
import { WorkspaceItem } from './workspace-item';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/stores/sidebar-store';
import { useWorkspaces } from '@/hooks/use-workspaces';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

interface WorkspaceDropdownProps {
  handleOpenCreateWorkspace: () => void;
}
export function WorkspaceDropdown({handleOpenCreateWorkspace}: WorkspaceDropdownProps) {
  const { activeWorkspace, setActiveWorkspace } = useWorkspaceStore();
  const { isOpen } = useSidebarStore();

  const { workspaces } = useWorkspaces();  
  const router = useRouter();
  const { workspaceSlug } = useParams();

  const activeWorkspaceDetails = useMemo(() => {
    return workspaces.find((workspace) => workspace.slug === activeWorkspace);
  }, [workspaces, activeWorkspace]);

  useEffect(() => {
    if (workspaceSlug) {
        setActiveWorkspace(workspaceSlug as string);
    }

    return () => {
      setActiveWorkspace(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceSlug])
  


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
          <Box className="h-5 w-5 text-neutral-500" strokeWidth={2} />
          {isOpen && (
            <>
              <span className="text-sm font-normal flex-1 text-left truncate">
                {activeWorkspaceDetails?.name ?? 'Workspaces'}
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
                isActive={workspace.id === activeWorkspace}
                onClick={() => {
                  router.push(`/app/${workspace.slug}`);
                }}
              />
            ))}
          </div>
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleOpenCreateWorkspace} className="flex items-center gap-2 py-2 px-2 cursor-pointer">
          <Plus className="h-5 w-5 text-neutral-500" strokeWidth={2} />
          <span className="text-sm">Create workspace</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
