'use client';

import { Workspace } from '@/types/workspace';
import { Box } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkspaceIconProps {
  workspace: Workspace;
  className?: string;
}

export function WorkspaceIcon({ workspace, className }: WorkspaceIconProps) {
  if (workspace.icon) {
    return <Box className="h-5 w-5 text-neutral-500" strokeWidth={2} />;
  }

  return <Box className="h-5 w-5 text-neutral-500" strokeWidth={2} />;
}
