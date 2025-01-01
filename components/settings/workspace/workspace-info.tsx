'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useWorkspaceStore } from '@/stores/workspace-store';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export function WorkspaceInfo() {
  const { activeWorkspace, updateWorkspace } = useWorkspaceStore();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(activeWorkspace.name);
  const [description, setDescription] = useState(
    activeWorkspace.description || ''
  );
  const [isPublic, setIsPublic] = useState(activeWorkspace.isPublic || false);

  const handleSave = () => {
    updateWorkspace(activeWorkspace.id, {
      name,
      description,
      isPublic,
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(false);
    toast({ description: 'Workspace settings updated' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          {' '}
          <h3 className="text-base font-medium">General Information</h3>
          <p className="text-sm text-muted-foreground">
            Basic details about your workspace
          </p>
        </div>
        <Button variant="outline" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Workspace Name</Label>
          {isEditing ? (
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="max-w-md"
            />
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-sm">{name}</p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Workspace ID</Label>
          <p className="text-sm text-muted-foreground font-mono">
            {activeWorkspace.id}
          </p>
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description for your workspace..."
            className="max-w-md resize-none"
            rows={3}
            disabled={!isEditing}
          />
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
            onCheckedChange={setIsPublic}
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2 pt-4">
          <div className="text-sm text-muted-foreground">
            Created{' '}
            {format(new Date(activeWorkspace.createdAt || Date.now()), 'PPP')}
          </div>
          <div className="text-sm text-muted-foreground">
            Last updated{' '}
            {format(new Date(activeWorkspace.updatedAt || Date.now()), 'PPP')}
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave}>Save Changes</Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
