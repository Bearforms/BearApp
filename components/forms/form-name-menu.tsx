'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFormStore } from '@/stores/form-store';
import { Button } from '@/components/ui/button';
import {
  ChevronDown,
  Copy,
  PencilLine,
  Link,
  FileSymlink,
  Trash2,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FormRenameDialog } from './rename/form-rename-dialog';
import { toast } from '@/hooks/use-toast';


export function FormNameMenu() {
  const router = useRouter();
  const [isRenaming, setIsRenaming] = useState(false);

  const form = useFormStore((state) =>state.form);
  const params = useParams();
  const updateForm = useFormStore((state) => state.updateForm);
  const addForm = useFormStore((state) => state.addForm);
  const deleteForm = useFormStore((state) => state.deleteForm);

  if (!form) return null;

  const handleRename = async (newName: string) => {
    if (newName.trim()) {
      await updateForm(form.id, {
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
    router.push(`/app/${params?.workspaceSlug}/edit/${duplicatedForm.id}`);
  };

  const handleDelete = () => {
    deleteForm(form.id);
    toast({ description: 'Form moved to trash' });
    router.push(`/app/${params?.workspaceSlug}`);
  };

  const handleCopyLink = async () => {
    try {
      const formUrl = `${window.location.origin}/form/${form.id}`;
      await navigator.clipboard.writeText(formUrl);
      toast({ description: 'Form link copied to clipboard' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy link',
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="ml-1 h-8 w-8">
            <MoreHorizontal className="h-4 w-4 text-neutral-500" strokeWidth={2} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
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
        initialName={form.name}
        onRename={handleRename}
      />
    </>
  );
}
