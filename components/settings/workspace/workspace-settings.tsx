'use client';

import { WorkspaceInfo } from './workspace-info';
import { WorkspaceMembers } from './workspace-members';
import { Separator } from '@/components/ui/separator';

export function WorkspaceSettings() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-lg font-medium">Workspace Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your workspace details and preferences
        </p>
      </div>

      <div>
        <WorkspaceInfo />
      </div>

      <Separator />

      <div>
        <WorkspaceMembers />
      </div>
    </div>
  );
}