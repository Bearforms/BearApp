'use client';

import { Workspace } from '@/types/workspace';
import { Box } from 'lucide-react';

interface WorkspaceIconProps {
  workspace: Workspace;
  className?: string;
}

export function WorkspaceIcon({ workspace }: WorkspaceIconProps) {
  if (workspace.icon) {
    return <Box className="h-5 w-5 text-neutral-500" strokeWidth={2} />;
  }

  return <Box className="h-5 w-5 text-neutral-500" strokeWidth={2} />;
}
