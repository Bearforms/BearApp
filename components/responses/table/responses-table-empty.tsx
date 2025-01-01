'use client';

import { TableCell, TableRow } from '@/components/ui/table';

interface ResponsesTableEmptyProps {
  colSpan: number;
}

export function ResponsesTableEmpty({ colSpan }: ResponsesTableEmptyProps) {
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        className="h-24 text-sm text-neutral-500"
      >
        0 responses
      </TableCell>
    </TableRow>
  );
}