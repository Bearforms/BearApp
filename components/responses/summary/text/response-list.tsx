'use client';

import { FormField } from '@/types/form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';

interface ResponseListProps {
  field: FormField;
  responses: any[];
}

export function ResponseList({ field, responses }: ResponseListProps) {
  // Sort responses by date, most recent first
  const sortedResponses = [...responses].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Response</TableHead>
            <TableHead className="w-[200px]">Submitted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedResponses.map((response) => {
            const value = response.data[field.label];
            if (!value) return null;

            return (
              <TableRow key={response.id}>
                <TableCell className="align-top">
                  {value.split('\n').map((line: string, i: number) => (
                    <p key={i}>{line}</p>
                  ))}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDistanceToNow(new Date(response.submittedAt), { addSuffix: true })}
                </TableCell>
              </TableRow>
            );
          })}
          {sortedResponses.length === 0 && (
            <TableRow>
              <TableCell colSpan={2} className="text-center text-muted-foreground py-4">
                No responses yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}