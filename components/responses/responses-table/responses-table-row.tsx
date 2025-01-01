'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { TableCell, TableRow } from '@/components/ui/table';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface ResponsesTableRowProps {
  response: any;
  fields: any[];
  isSelected: boolean;
  onSelect: (id: string, checked: boolean) => void;
  onDelete: (id: string) => void;
  formatFieldValue: (field: any, value: any) => string;
}

export function ResponsesTableRow({
  response,
  fields,
  isSelected,
  onSelect,
  onDelete,
  formatFieldValue,
}: ResponsesTableRowProps) {
  return (
    <TableRow
      className={cn('border-neutral-100 group', isSelected && 'bg-neutral-50')}
    >
      <TableCell className="sticky left-0 bg-white z-10">
        <div className="flex items-center">
          <div className="w-[32px]">
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) =>
                onSelect(response.id, checked as boolean)
              }
              aria-label={`Select response from ${formatDistanceToNow(
                new Date(response.submittedAt),
                { addSuffix: true }
              )}`}
            />
          </div>
          <div className="ml-1.5 text-sm text-neutral-600 w-max">
            {formatDistanceToNow(new Date(response.submittedAt), {
              addSuffix: true,
            })}
          </div>
        </div>
      </TableCell>
      {fields.map((field) => (
        <TableCell
          key={field.id}
          className="truncate px-4"
          title={formatFieldValue(field, response.data[field.label])}
        >
          {formatFieldValue(field, response.data[field.label])}
        </TableCell>
      ))}
      <TableCell className="w-[50px] p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="h-4 w-4" strokeWidth={2} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete(response.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" strokeWidth={2} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
