'use client';

import { useState } from 'react';
import { useFormStore } from '@/stores/form-store';
import { Sidebar } from '@/components/layout/sidebar';
import { DeletedHeader } from '@/components/deleted/deleted-header';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { MoreHorizontal, Undo2, Trash2, FileText } from 'lucide-react';
import { FormPreviewThumbnail } from '@/components/forms/form-preview-thumbnail';
import { formatDistanceToNow } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function DeletedPage() {
  const deletedForms = useFormStore((state) =>
    state.forms.filter((f) => f.deletedAt)
  );
  const restoreForm = useFormStore((state) => state.restoreForm);
  const permanentlyDeleteForm = useFormStore(
    (state) => state.permanentlyDeleteForm
  );

  const handleRestore = (id: string) => {
    restoreForm(id);
    toast({ description: 'Form restored' });
  };

  const handlePermanentDelete = (id: string) => {
    permanentlyDeleteForm(id);
    toast({ description: 'Form permanently deleted' });
  };

  if (deletedForms.length === 0) {
    return (
      <div className="flex h-screen bg-neutral-50">
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0">
          <DeletedHeader />
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-md mx-auto text-center">
              <div className="w-12 h-12 rounded-full bg-neutral-100 mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-neutral-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold mb-2">No deleted forms</h2>
              <p className="text-sm text-neutral-500">
                Forms that you delete will be available here for 30 days
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <DeletedHeader />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="w-full">
            <div className="flex-col space-y-3">
              {deletedForms.map((form) => (
                <div
                  key={form.id}
                  className="group flex space-x-2 p-2 pr-3 items-center relative bg-white rounded-md border border-neutral-200 hover:border-neutral-300 transition-colors"
                >
                  <div className="h-16 w-16 flex rounded-full items-center justify-center relative bg-neutral-50 p-0  rounded-md overflow-hidden">
                    <FileText className="h-6 w-6 text-neutral-400" />
                  </div>
                  <div className="flex space-x-2 w-full items-center">
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-start justify-between">
                        <h3 className="text-base font-medium text-neutral-900">
                          {form.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-neutral-500">
                        <span>
                          Deleted{' '}
                          {formatDistanceToNow(new Date(form.deletedAt!), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-52 bg-white"
                        >
                          <DropdownMenuItem
                            onClick={() => handleRestore(form.id)}
                          >
                            <Undo2 className="text-neutral-500 h-5 w-5 mr-2.5" />
                            Restore
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600 focus:bg-red-50"
                            onClick={() => handlePermanentDelete(form.id)}
                          >
                            <Trash2 className="h-5 w-5 mr-2.5" />
                            Delete permanently
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
