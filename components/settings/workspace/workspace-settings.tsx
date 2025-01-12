import { Workspace } from '@/types/supabase';
import { WorkspaceInfo } from './workspace-info';
import { WorkspaceMembers } from './workspace-members';
import { Separator } from '@/components/ui/separator';

interface WorkspaceSettingsProps {
  workspace: Workspace;
}
export function WorkspaceSettings({ workspace }: WorkspaceSettingsProps) {
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Workspace Settings</h2>
        <p className="text-sm text-neutral-500">
          Manage your workspace details and preferences
        </p>
      </div>

      <div>
        <WorkspaceInfo workspace={workspace} />
      </div>

      <Separator />

      <div>
        <WorkspaceMembers />
      </div>
    </div>
  );
}