'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useFormStore } from '@/stores/form-store';
import { useResponseStore } from '@/stores/response-store';
import { useTimeFilterStore } from './filters/time-filter/time-filter-store';
import { isWithinDateRange } from './filters/time-filter/utils';
import { ResponsesToolbar } from './responses-toolbar';
import { Table, TableBody } from '@/components/ui/table';
import { ResponsesTableHeader } from './table/responses-table-header';
import { ResponsesTableRow } from './table/responses-table-row';
import { ResponsesTableEmpty } from './table/responses-table-empty';
import { formatResponseValue } from '@/lib/utils/format-response';

export function ResponsesTable() {
  const params = useParams();
  const [search, setSearch] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Get form data
  const form = useFormStore((state) =>
    state.forms.find((f) => f.id === params.id && !f.deletedAt)
  );

  // Early return if form not found
  if (!form) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm text-neutral-500">Form not found</p>
      </div>
    );
  }

  // Get responses and other store data
  const responses = useResponseStore((state) =>
    state.getFormResponses(params.id as string)
  );
  const deleteResponse = useResponseStore((state) => state.deleteResponse);
  const updateResponseCount = useFormStore((state) => state.updateResponseCount);
  const { dateRange } = useTimeFilterStore();

  // Get all input fields (excluding content fields)
  const fields = form.fields.filter(
    (f) =>
      f.type !== 'heading' &&
      f.type !== 'paragraph' &&
      f.type !== 'page-break' &&
      f.type !== 'rich-text'
  );

  const filteredAndSortedResponses = responses
    .filter((response) => {
      const searchLower = search.toLowerCase();
      const matchesSearch = Object.values(response.data).some((value) =>
        String(value).toLowerCase().includes(searchLower)
      );

      const matchesDateRange = isWithinDateRange(
        new Date(response.submittedAt),
        dateRange
      );

      return matchesSearch && matchesDateRange;
    })
    .sort(
      (a, b) =>
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(
      checked ? filteredAndSortedResponses.map((r) => r.id) : []
    );
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelectedRows((prev) =>
      checked ? [...prev, id] : prev.filter((rowId) => rowId !== id)
    );
  };

  const handleDeleteResponse = (id: string) => {
    deleteResponse(id);
    updateResponseCount(params.id as string, responses.length - 1);
    setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
  };

  const handleDeleteSelected = () => {
    selectedRows.forEach((id) => deleteResponse(id));
    updateResponseCount(params.id as string, responses.length - selectedRows.length);
    setSelectedRows([]);
  };

  return (
    <div className="p-8 space-y-4">
      <ResponsesToolbar
        search={search}
        onSearchChange={setSearch}
        selectedCount={selectedRows.length}
        onDeleteSelected={handleDeleteSelected}
        responses={filteredAndSortedResponses}
        fields={fields}
        formName={form.name}
      />

      <div className="overflow-x-auto rounded-md border border-neutral-200 bg-white">
        <div className="relative min-w-[800px]">
          <Table>
            <ResponsesTableHeader
              fields={fields}
              selectedRows={selectedRows}
              responses={filteredAndSortedResponses}
              onSelectAll={handleSelectAll}
            />
            <TableBody>
              {filteredAndSortedResponses.length === 0 ? (
                <ResponsesTableEmpty colSpan={fields.length + 3} />
              ) : (
                filteredAndSortedResponses.map((response) => (
                  <ResponsesTableRow
                    key={response.id}
                    response={response}
                    fields={fields}
                    isSelected={selectedRows.includes(response.id)}
                    onSelect={handleSelectRow}
                    onDelete={handleDeleteResponse}
                    formatFieldValue={formatResponseValue}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}