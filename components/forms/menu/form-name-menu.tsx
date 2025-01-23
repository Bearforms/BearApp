'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFormStore } from '@/stores/form-store';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { FormOptionsMenu } from './form-options-menu';
import { FormRenameDialog } from './form-rename-dialog';

interface FormNameMenuProps {
  formId: string;
  name: string;
  onNameChange: (name: string) => void;
  className?: string;
}

export function FormNameMenu({
  formId,
  name,
  onNameChange,
  className,
}: FormNameMenuProps) {
  const router = useRouter();
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(name);

  const form = useFormStore((state) =>
    state.forms.find((f) => f.id === formId)
  );
  const params =  useParams();
  const addForm = useFormStore((state) => state.addForm);
  const deleteForm = useFormStore((state) => state.deleteForm);

  if (!form) return null;

  const handleRename = () => {
    if (newName.trim()) {
      onNameChange(newName.trim());
      setIsRenaming(false);
      toast({ description: 'Form renamed' });
    }
  };

  const handleDuplicate = () => {
    const duplicatedForm = {
      ...form,
      id: Math.random().toString(36).slice(2, 11),
      name: `${form.name} (Copy)`,
      responses: 0,
      lastUpdated: new Date().toISOString(),
    };
    addForm(duplicatedForm);
    toast({ description: 'Form duplicated' });
    router.push(`/app/${params?.workspaceSlug}/edit/${duplicatedForm.id}`);
  };

  const handleDelete = () => {
    deleteForm(formId);
    toast({ description: 'Form moved to trash' });
    router.push(`/app/${params?.workspaceSlug}`);
  };

  return (
    <>
      <div className={cn('flex items-center gap-1 w-auto overflow-hidden', className)}>
        <span className="text-sm truncate">{name}</span>
        <FormOptionsMenu
          form={form}
          onRename={() => setIsRenaming(true)}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
        />
      </div>

      <FormRenameDialog
        open={isRenaming}
        onOpenChange={setIsRenaming}
        name={newName}
        onNameChange={setNewName}
        onSave={handleRename}
      />
    </>
  );
}