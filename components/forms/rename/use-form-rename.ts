'use client';

import { useState } from 'react';
import { useFormStore } from '@/stores/form-store';
import { toast } from '@/hooks/use-toast';

export function useFormRename() {
  const [isRenaming, setIsRenaming] = useState(false);
  const [formToRename, setFormToRename] = useState<{ id: string; name: string } | null>(null);
  const updateForm = useFormStore((state) => state.updateForm);

  const startRenaming = (id: string, currentName: string) => {
    setFormToRename({ id, name: currentName });
    setIsRenaming(true);
  };

  const cancelRenaming = () => {
    setFormToRename(null);
    setIsRenaming(false);
  };

  const handleRename = async (newName: string) => {
    if (!formToRename || !newName.trim()) return;

    try {
      await updateForm(formToRename.id, {
        name: newName.trim(),
        lastUpdated: new Date().toISOString(),
      });
      toast({ description: 'Form renamed' });
    } catch (error) {
      toast({ 
        title: 'Error',
        description: 'Failed to rename form',
        variant: 'destructive'
      });
    } finally {
      setFormToRename(null);
      setIsRenaming(false);
    }
  };

  return {
    isRenaming,
    formToRename,
    startRenaming,
    cancelRenaming,
    handleRename
  };
}