'use client';

import { Button } from '@/components/ui/button';
import {
  ChevronDown,
  Copy,
  PencilLine,
  FileEdit,
  Link2,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Form } from '@/types/form';
import { useFormLink } from './use-form-link';

interface FormOptionsMenuProps {
  form: Form;
  onRename: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export function FormOptionsMenu({
  form,
  onRename,
  onDuplicate,
  onDelete,
}: FormOptionsMenuProps) {
  const { handleCopyLink } = useFormLink(form.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-neutral-100"
        >
          <ChevronDown className="h-4 w-4 text-neutral-500" strokeWidth={2} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px] bg-popover">
        <DropdownMenuItem onClick={onRename}>
          <PencilLine
            className="text-neutral-500 h-4 w-4 mr-2"
            strokeWidth={2}
          />
          Rename
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onDuplicate}>
          <Copy className="text-neutral-500 h-4 w-4 mr-2" strokeWidth={2} />
          Duplicate
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleCopyLink}>
          <Link2 className="text-neutral-500 h-4 w-4 mr-2" strokeWidth={2} />
          Copy link
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onDelete}
          className="text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          <Trash2 className="h-4 w-4 mr-2" strokeWidth={2} />
          Move to trash
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
