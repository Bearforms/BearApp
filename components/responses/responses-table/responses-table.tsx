'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useFormStore } from '@/stores/form-store';
import { useResponseStore } from '@/stores/response-store';
import { useTimeFilterStore } from '../filters/time-filter/time-filter-store';
import { isWithinDateRange } from '../filters/time-filter/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody } from '@/components/ui/table';
import { Search, Download, Trash2, X } from 'lucide-react';
import { TimeFilter } from '../filters/time-filter/time-filter';
import { ResponsesTableHeader } from './responses-table-header';
import { ResponsesTableRow } from './responses-table-row';
import { ResponsesTableEmpty } from './responses-table-empty';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export function ResponsesTable() {
  const params = useParams();
  const [search, setSearch] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const form = useFormStore((state) =>
    state.forms.find((f) => f.id === params.id)
  );
  const responses = useResponseStore((state) =>
    state.getFormResponses(params.id as string)
  );
  const deleteResponse = useResponseStore((state) => state.deleteResponse);
  const updateResponseCount = useFormStore(
    (state) => state.updateResponseCount
  );
  const { dateRange } = useTimeFilterStore();

  if (!form) {
    return (
      <div className="p-7 bg-neutral-50">
        <div className="text-center text-sm text-neutral-500">
          Form not found
        </div>
      </div>
    );
  }

  const fields = form.fields.filter(
    (f) =>
      f.type !== 'heading' &&
      f.type !== 'paragraph' &&
      f.type !== 'page-break' &&
      f.settings?.visible !== false
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
    setSelectedRows(checked ? filteredAndSortedResponses.map((r) => r.id) : []);
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
    toast({
      description: 'Response deleted',
    });
  };

  const handleDeleteSelected = () => {
    selectedRows.forEach((id) => deleteResponse(id));
    updateResponseCount(
      params.id as string,
      responses.length - selectedRows.length
    );
    setSelectedRows([]);
    toast({
      description: `${selectedRows.length} responses deleted`,
    });
  };

  const formatFieldValue = (field: any, value: any) => {
    if (!value) return '';

    switch (field.type) {
      case 'date':
        try {
          return format(new Date(value), 'PPP');
        } catch {
          return value;
        }
      case 'file':
      case 'multi-select':
        return Array.isArray(value) ? value.join(', ') : value;
      default:
        return String(value);
    }
  };

  return (
    <div className="p-8 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Input
              placeholder="Search responses"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 rounded-md border-neutral-200"
            />
            <Search
              className="h-4 w-4 absolute left-3 top-2.5 text-neutral-500"
              strokeWidth={2}
            />
          </div>
          <TimeFilter />
        </div>

        {selectedRows.length > 0 && (
          <div className="flex items-center gap-3 ml-auto animate-in slide-in-from-top-2 duration-200">
            <span className="text-sm text-neutral-600">
              {selectedRows.length} selected
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeleteSelected}
              className="gap-2 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedRows([])}
              className="p-0 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

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
                    formatFieldValue={formatFieldValue}
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
