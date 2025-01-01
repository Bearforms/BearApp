'use client';

import { FormField } from '@/types/form';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CONDITION_OPERATORS, CONDITION_VALUES } from '../constants';

interface ConditionRowProps {
  condition: {
    id: string;
    fieldId: string;
    operator: string;
    value: string;
  };
  availableFields: FormField[];
  onUpdate: (id: string, updates: any) => void;
  onRemove: (id: string) => void;
}

export function ConditionRow({
  condition,
  availableFields,
  onUpdate,
  onRemove
}: ConditionRowProps) {
  return (
    <div className="flex gap-2 items-start">
      <div className="flex-1 grid gap-2">
        <Select
          value={condition.fieldId}
          onValueChange={(value) => onUpdate(condition.id, { fieldId: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select field" />
          </SelectTrigger>
          <SelectContent>
            {availableFields.map((f) => (
              <SelectItem key={f.id} value={f.id}>
                {f.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={condition.operator}
          onValueChange={(value) => onUpdate(condition.id, { operator: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select operator" />
          </SelectTrigger>
          <SelectContent>
            {CONDITION_OPERATORS.map((op) => (
              <SelectItem key={op.value} value={op.value}>
                {op.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={condition.value}
          onValueChange={(value) => onUpdate(condition.id, { value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select value" />
          </SelectTrigger>
          <SelectContent>
            {CONDITION_VALUES.map((val) => (
              <SelectItem key={val.value} value={val.value}>
                {val.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(condition.id)}
        className="mt-2"
      >
        <Trash2 className="h-4 w-4 text-muted-foreground" />
      </Button>
    </div>
  );
}