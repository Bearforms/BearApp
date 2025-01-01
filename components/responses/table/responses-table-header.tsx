'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ResponsesTableHeaderProps {
  fields: any[];
  selectedRows: string[];
  responses: any[];
  onSelectAll: (checked: boolean) => void;
}

export function ResponsesTableHeader({
  fields,
  selectedRows,
  responses,
  onSelectAll,
}: ResponsesTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow className="border-neutral-100">
        <TableHead className="w-[180px] sticky left-0 bg-white z-20">
          <div className="flex items-center">
            <div className="w-[32px]">
              <Checkbox
                checked={
                  selectedRows.length === responses.length &&
                  responses.length > 0
                }
                onCheckedChange={onSelectAll}
                aria-label="Select all responses"
              />
            </div>
            <div className="ml-1.5 whitespace-nowrap">Submitted</div>
          </div>
        </TableHead>
        {fields.map((field) => (
          <TableHead key={field.id} className="whitespace-nowrap px-4">
            {field.label}
          </TableHead>
        ))}
        <TableHead className="w-[50px] p-0"></TableHead>
      </TableRow>
    </TableHeader>
  );
}