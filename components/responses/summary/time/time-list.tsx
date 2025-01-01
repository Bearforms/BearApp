'use client';

import { FormField } from '@/types/form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';

interface TimeListProps {
  field: FormField;
  responses: any[];
}

export function TimeList({ field, responses }: TimeListProps) {
  // Sort responses by date, most recent first
  const sortedResponses = [...responses]
    .filter(response => response.data[field.label])
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Period</TableHead>
            <TableHead className="w-[200px]">Submitted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedResponses.map((response) => {
            const value = response.data[field.label];
            if (!value) return null;

            // Parse time value (assuming format: "HH:MM AM/PM")
            const [time, period] = value.split(' ');

            return (
              <TableRow key={response.id}>
                <TableCell>{time}</TableCell>
                <TableCell>{period}</TableCell>
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