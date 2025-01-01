'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

interface NewFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewFormModal({ open, onOpenChange }: NewFormModalProps) {
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  const addForm = useFormStore((state) => state.addForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || isCreating) return;

    setIsCreating(true);

    const formId = nanoid();
    const newForm = {
      id: formId,
      name,
      title: '',
      description: '',
      responses: 0,
      lastUpdated: new Date().toISOString(),
      fields: [],
      themeSettings: {
        coverType: 'color' as const,
        showLogo: true,
        coverImage: '',
        coverColor: '#f3f4f6',
      },
    };

    try {
      addForm(newForm);
      router.push(`/edit/${formId}`);
    } finally {
      setName(''); // Reset the input
      onOpenChange(false); // Close modal after navigation
      setIsCreating(false);
    }
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
