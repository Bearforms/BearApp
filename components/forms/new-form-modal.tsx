'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';
import { useFormStore } from '@/stores/form-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { defaultThankYouSettings, defaultThemeSettings } from '@/lib/constants/theme-defaults';
import { useMutation } from '@tanstack/react-query';
import { createForm } from '@/actions/forms/createForm';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface NewFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewFormModal({ open, onOpenChange }: NewFormModalProps) {
  const [name, setName] = useState('');
  const router = useRouter();
  const params = useParams();
  const addForm = useFormStore((state) => state.addForm);

  const [error, setError] = useState<string | null>(null);
  const { isPending, mutate } = useMutation({
    mutationFn: createForm,
    onSuccess: (data) => {
      console.log(data);

      onOpenChange(false);
      addForm(data as any);
      router.push(`/app/${params?.workspaceSlug}/edit/${data.id}`);
    },
    onError: (error) => {
      setError(error.message);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    setError(null);
    mutate({ name, workspaceSlug: params?.workspaceSlug as string });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[480px]">
        <DialogHeader>
          <DialogTitle>Create new form</DialogTitle>
          <DialogDescription>
            Give your form a name to get started. You can change this later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>

          {
            !!error && (
              <Alert variant="destructive" className='mb-4'>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Failed</AlertTitle>
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )
          }
          <div className="py-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Form name"
              className="w-full"
              autoFocus
              disabled={isPending}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim() || isPending}>
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
