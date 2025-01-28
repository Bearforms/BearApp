
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

interface NewWorkspaceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewWorkspaceModal({ open, onOpenChange }: NewWorkspaceModalProps) {
  const [name, setName] = useState('');
  const router = useRouter();
  const { refetchWorkspaces } = useWorkspaces();

  const { isPending, mutate } = useMutation({
    mutationFn: createWorkspace,
    onSuccess: (data) => {
      onOpenChange(false);
      refetchWorkspaces();

      if (data.slug)  router.push(`/app/${data.slug}`);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || isPending) return;

    mutate(name);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[480px]">
        <DialogHeader>
          <DialogTitle>New workspace</DialogTitle>
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
                  Creating...
                </>
              ) : (
                'Create'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
