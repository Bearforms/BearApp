'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStore } from '@/stores/form-store';
import { Button } from '@/components/ui/button';
import {
  ChevronDown,
  Copy,
  PencilLine,
  Link,
  FileSymlink,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FormRenameDialog } from './rename/form-rename-dialog';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface FormNameMenuProps {
  formId: string;
  name: string;
}

export function FormNameMenu({ formId, name }: FormNameMenuProps) {
  const router = useRouter();
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(name);

  const form = useFormStore((state) =>
    state.forms.find((f) => f.id === formId)
  );
  const updateForm = useFormStore((state) => state.updateForm);
  const addForm = useFormStore((state) => state.addForm);
  const deleteForm = useFormStore((state) => state.deleteForm);

  if (!form) return null;

  const handleRename = async (newName: string) => {
    if (newName.trim()) {
      await updateForm(formId, {
        name: newName.trim(),
        lastUpdated: new Date().toISOString(),
      });
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
    router.push(`/edit/${duplicatedForm.id}`);
  };

  const handleDelete = () => {
    deleteForm(formId);
    toast({ description: 'Form moved to trash' });
    router.push('/');
  };

  const handleCopyLink = async () => {
    try {
      const formUrl = `${window.location.origin}/form/${formId}`;
      await navigator.clipboard.writeText(formUrl);
      toast({ description: 'Form link copied to clipboard' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy link',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <span className="text-sm truncate">{name}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="ml-1 h-8 w-8">
            <ChevronDown className="h-4 w-4 text-neutral-500" strokeWidth={2} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-52">
          <DropdownMenuItem onClick={() => setIsRenaming(true)}>
            <PencilLine
              className="text-neutral-500 h-5 w-5 mr-2.5"
              strokeWidth={2}
            />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDuplicate}>
            <Copy className="text-neutral-500 h-5 w-5 mr-2.5" strokeWidth={2} />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyLink}>
            <FileSymlink
              className="text-neutral-500 h-5 w-5 mr-2.5"
              strokeWidth={2}
            />
            Copy link
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            className="text-red-600 focus:text-red-600 focus:bg-red-50"
          >
            <Trash2 className="h-5 w-5 mr-2.5" strokeWidth={2} />
            Move to trash
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <FormRenameDialog
        open={isRenaming}
        onOpenChange={setIsRenaming}
        initialName={name}
        onRename={handleRename}
      />
    </>
  );
}
