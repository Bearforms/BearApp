'use client';

import { useParams } from 'next/navigation';
import { useFormStore } from '@/stores/form-store';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { FormRenameDialog } from '../rename/form-rename-dialog';
import { useFormRename } from '../rename/use-form-rename';
import { FormNameMenu } from '../form-name-menu';

interface FormTitleProps {
  title?: string;
}

export function FormTitle({ title }: FormTitleProps) {
  const params = useParams();
  const form = useFormStore((state) => state.forms.find((f) => f.id === params.id));
  const { isRenaming, formToRename, startRenaming, cancelRenaming, handleRename } = useFormRename();

  if (!form) return null;

  return (
    <>
      <div className="flex items-center text-sm">
        <Link href={`/app/${params.workspaceSlug}`} className="text-neutral-500 hover:text-neutral-900 transition-colors">
          Forms
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-neutral-400" />
        <button
          onClick={() => startRenaming(form.id, form.name)}
          className="text-neutral-900 hover:text-neutral-700 transition-colors"
        >
          {form.name}
        </button>
      </div>

      <FormRenameDialog
        open={isRenaming}
        onOpenChange={(open) => !open && cancelRenaming()}
        initialName={formToRename?.name || ''}
        onRename={handleRename}
      />
    </>
  );
}