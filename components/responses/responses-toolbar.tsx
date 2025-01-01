'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Trash2, X } from 'lucide-react';
import { TimeFilter } from './filters/time-filter/time-filter';
import { ExportButton } from './export/export-button';
import { ResponsesSummaryButton } from './summary/responses-summary-button';
import { ResponsesSummaryModal } from './summary/responses-summary-modal';
import { DeleteResponsesModal } from './delete-responses-modal';

interface ResponsesToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCount: number;
  onDeleteSelected: () => void;
  responses: any[];
  fields: any[];
  formName: string;
}

export function ResponsesToolbar({
  search,
  onSearchChange,
  selectedCount,
  onDeleteSelected,
  responses,
  fields,
  formName,
}: ResponsesToolbarProps) {
  const [showSummary, setShowSummary] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDeleteSelected();
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 gap-y-3">
        <div className="relative w-full">
          <Input
            placeholder="Search responses"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-9 rounded-md border-neutral-200"
          />
          <Search
            className="h-4 w-4 absolute left-3 top-2.5 text-neutral-500"
            strokeWidth={2}
          />
        </div>
        <TimeFilter />
        <div className="lg:col-span-3">
          <div className="flex items-center gap-3 justify-end">
            {selectedCount > 0 && (
              <div className="flex items-center gap-3 ml-auto animate-in slide-in-from-top-2 duration-200">
                <span className="text-sm text-neutral-600">
                  {selectedCount} selected
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDelete}
                  className="gap-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            )}

            <ExportButton
              responses={responses}
              fields={fields}
              formName={formName}
            />

            <ResponsesSummaryButton onClick={() => setShowSummary(true)} />
          </div>
        </div>
      </div>

      <ResponsesSummaryModal
        open={showSummary}
        onOpenChange={setShowSummary}
        responses={responses}
        fields={fields}
      />

      <DeleteResponsesModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        selectedCount={selectedCount}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}