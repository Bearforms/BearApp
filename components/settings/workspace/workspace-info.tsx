'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';
import { Workspace } from '@/types/supabase';
import { useMutation } from '@tanstack/react-query';
import { updateWorkspacePublicStatus } from '@/actions/workspaces/updateWorkspacePublicStatus';

interface WorkspaceInfoProps {
  workspace: Workspace;
}

export function WorkspaceInfo({ workspace }: WorkspaceInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPublic, setIsPublic] = useState(workspace.is_public || false);

  const { mutate, isPending: isPendingUpdateStatus } = useMutation({
    mutationFn: updateWorkspacePublicStatus,
    onError: () => {
      setIsPublic(workspace.is_public);
    }
  });

  const canUpdateWorkspace = false;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div>
          {' '}
          <h3 className="text-base font-medium">General Information</h3>
          <p className="text-sm text-muted-foreground">
            Created {format(new Date(workspace.created_at || Date.now()), 'PPP')} {" "}
            {"•"} Last updated {format(new Date(workspace.updated_at || Date.now()), 'PPP')} {" "}
            by {workspace.updated_by?.first_name} {workspace.updated_by?.last_name}
          </p>
        </div>
        {
          canUpdateWorkspace && (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )
        }
      </div>

      <div className="space-y-4">
        <div className="">
          <Label>Workspace Name</Label>
          <p className="text-sm text-muted-foreground">
            {workspace.name}
          </p>
        </div>

        <div className="">
          <Label>Workspace ID</Label>
          <p className="text-sm text-muted-foreground font-mono">
            {workspace.id}
          </p>
        </div>

        <div className="">
          <Label>Description</Label>
          <p className="text-sm text-muted-foreground font-mono">
            {workspace.description ?? "No description"}
          </p>
        </div>

        <div className="flex items-center justify-between max-w-md">
          <div className="space-y-0.5">
            <Label>Public Workspace</Label>
            <p className="text-sm text-muted-foreground">
              Allow anyone with the link to view forms
            </p>
          </div>
          <Switch
            checked={isPublic}
            onCheckedChange={state => {
              setIsPublic(state);
              mutate({ workspaceId: workspace.id, isPublic: state });
            }}
            disabled={!canUpdateWorkspace || isPendingUpdateStatus}
          />
        </div>
      </div>
    </div>
  );
}
