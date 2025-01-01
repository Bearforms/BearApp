'use client';

import { FormField } from '@/types/form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format, formatDistanceToNow } from 'date-fns';

interface DateListProps {
  field: FormField;
  responses: any[];
}

export function DateList({ field, responses }: DateListProps) {
  // Sort responses by date, most recent first
  const sortedResponses = [...responses]
    .filter(response => response.data[field.label])
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Day of Week</TableHead>
            <TableHead className="w-[200px]">Submitted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedResponses.map((response) => {
            const value = response.data[field.label];
            if (!value) return null;

            const date = new Date(value);

            return (
              <TableRow key={response.id}>
                <TableCell>{format(date, 'MMM d, yyyy')}</TableCell>
                <TableCell>{format(date, 'EEEE')}</TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDistanceToNow(new Date(response.submittedAt), { addSuffix: true })}
                </TableCell>
              </TableRow>
            );
          })}
          {sortedResponses.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground py-4">
                No responses yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}