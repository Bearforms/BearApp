'use client';

import { useParams, useRouter } from 'next/navigation';
import { useFormStore } from '@/stores/form-store';
import { useResponseStore } from '@/stores/response-store';
import { Button } from '@/components/ui/button';
import {
  MoreHorizontal,
  Plus,
  PencilLine,
  FileText,
  FileEdit,
  Copy,
  Trash2,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { FormRenameDialog } from './rename/form-rename-dialog';
import { useFormRename } from './rename/use-form-rename';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FormListProps {
  searchQuery: string;
  onNewForm: () => void;
}

export function FormList({ searchQuery, onNewForm }: FormListProps) {
  const router = useRouter();
  const forms = useFormStore((state) =>
    state.forms.filter((f) => !f.deletedAt)
  );
  const { workspaceSlug } = useParams();
  const addForm = useFormStore((state) => state.addForm);
  const deleteForm = useFormStore((state) => state.deleteForm);
  const getFormResponses = useResponseStore((state) => state.getFormResponses);
  const {
    isRenaming,
    formToRename,
    startRenaming,
    cancelRenaming,
    handleRename,
  } = useFormRename();

  const handleDuplicate = (form: any) => {
    const id = Math.random().toString(36).slice(2, 11);
    const newForm = {
      ...form,
      id,
      name: `${form.name} (Copy)`,
      responses: 0,
      lastUpdated: new Date().toISOString(),
    };
    addForm(newForm);
  };

  const filteredAndSortedForms = forms
    .filter(
      (form) =>
        form.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        form.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort(
      (a, b) =>
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    );

  if (forms.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="w-12 h-12 rounded-full bg-neutral-100 mx-auto mb-4 flex items-center justify-center">
            <FileText className="h-6 w-6 text-neutral-400" strokeWidth={2} />
          </div>
          <h2 className="text-lg font-semibold mb-2">No forms yet</h2>
          <p className="text-sm text-neutral-500 mb-6">
            Create your first form to start collecting responses
          </p>
          <Button onClick={onNewForm}>
            <Plus className="mr-2 h-4 w-4" strokeWidth={2} />
            New form
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-col space-y-3">
        {filteredAndSortedForms.map((form) => {
          const responses = getFormResponses(form.id);
          const responseCount = responses.length;

          const zonedDate = new Date(form.lastUpdated);
          zonedDate.setHours(zonedDate.getHours() + 3);
          const timeAgo = formatDistanceToNow(zonedDate, {
            addSuffix: true,
          });

          return (
            <div
              key={form.id}
              className="group flex space-x-2 p-2 pr-3 items-center relative bg-white rounded-md border border-neutral-200 hover:border-neutral-300 transition-colors"
            >
              <div
                className="h-16 w-16 flex items-center justify-center relative cursor-pointer bg-neutral-50 p-0  rounded-md overflow-hidden"
                onClick={() => router.push(`/app/${workspaceSlug}/edit/${form.id}`)}
              >
                <FileText className="h-6 w-6 text-neutral-400" />
              </div>
              <div className="flex space-x-2 w-full items-center">
                <div className="grow space-y-0.5">
                  <div className="flex items-start justify-between">
                    <h3
                      className="text-base font-medium text-neutral-900 cursor-pointer"
                      onClick={() => router.push(`/app/${workspaceSlug}/edit/${form.id}`)}
                    >
                      {form.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-neutral-500">
                    <span className="truncate">
                      {responseCount}{' '}
                      {responseCount === 1 ? 'Response' : 'Responses'}
                    </span>
                    <span>•</span>
                    <span className="truncate">{timeAgo}</span>
                  </div>
                </div>
                <div className="flex-none">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="px-1.5">
                        <MoreHorizontal className="h-5 w-5" strokeWidth={2} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52">
                      <DropdownMenuItem
                        onClick={() => router.push(`/app/${workspaceSlug}/edit/${form.id}`)}
                      >
                        <FileEdit
                          className="text-neutral-500 h-5 w-5 mr-2.5"
                          strokeWidth={2}
                        />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => startRenaming(form.id, form.name)}
                      >
                        <PencilLine
                          className="text-neutral-500 h-5 w-5 mr-2.5"
                          strokeWidth={2}
                        />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicate(form)}>
                        <Copy
                          className="text-neutral-500 h-5 w-5 mr-2.5"
                          strokeWidth={2}
                        />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                        onClick={() => deleteForm(form.id)}
                      >
                        <Trash2 className="h-5 w-5 mr-2.5" strokeWidth={2} />
                        Move to trash
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          );
        })}
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
