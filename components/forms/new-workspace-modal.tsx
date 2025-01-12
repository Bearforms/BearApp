
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

interface NewWorkspaceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewWorkspaceModal({ open, onOpenChange }: NewWorkspaceModalProps) {
  const [name, setName] = useState('');
  const router = useRouter();
  const params = useParams();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: createWorkspace,
    onSuccess: (data) => {
      console.log(data);
    },
  });



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[480px]">
        <DialogHeader>
          <DialogTitle>Create new workspace</DialogTitle>
          <DialogDescription>
            Give your form a name to get started. You can change this later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Form name"
              className="w-full"
              autoFocus
              disabled={isCreating}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim() || isCreating}>
              {isCreating ? (
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
