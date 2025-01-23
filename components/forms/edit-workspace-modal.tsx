
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';
import { useFormStore } from '@/stores/form-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useMutation } from '@tanstack/react-query';
import { createWorkspace } from '@/actions/workspaces/createWorkspace';
import { useWorkspaces } from '@/hooks/use-workspaces';
import { Workspace } from '@/types/supabase';
import { Textarea } from '../ui/textarea';
import { updateWorkspace } from '@/actions/workspaces/updateWorkspace';

interface EditWorkspaceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspace: Workspace;
}

export function EditWorkspaceModal({workspace, open, onOpenChange }: EditWorkspaceModalProps) {
  const [name, setName] = useState(workspace.name ?? '');
  const [description, setDescription] = useState(workspace.description ?? '');
  const router = useRouter();
  const { refetchWorkspaces } = useWorkspaces();

  const { isPending, mutate } = useMutation({
    mutationFn: updateWorkspace,
    onSuccess: (data) => {
      onOpenChange(false);
      refetchWorkspaces();
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || isPending) return;

    mutate({name, description, workspaceId: workspace.id});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[480px]">
        <DialogHeader>
          <DialogTitle>Update workspace</DialogTitle>
          <DialogDescription className='hidden'>
            Give your workspace a name to get started. You can change this later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Workspace name"
            className="w-full mt-3"
            autoFocus
            disabled={isPending}
          />

          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Workspace description"
            className="w-full mt-3"
            disabled={isPending}
          />

          <DialogFooter className='mt-6'>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2
                    className="mr-2 h-4 w-4 animate-spin"
                    strokeWidth={2}
                  />
                  Updating...
                </>
              ) : (
                'Update'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
