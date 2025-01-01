'use client';

import { FormField } from '@/types/form';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getAvailableOperators, getFieldValues } from '@/lib/utils/condition-values';

interface StepConditionRowProps {
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

export function StepConditionRow({
  condition,
  availableFields,
  onUpdate,
  onRemove,
}: StepConditionRowProps) {
  const selectedField = availableFields.find(f => f.id === condition.fieldId);
  const operators = selectedField ? getAvailableOperators(selectedField.type) : [];
  const values = selectedField ? getFieldValues(selectedField) : [];

  return (
    <div className="space-y-2 p-2 bg-neutral-50 rounded-md border-[0.5px] border-neutral-200">
      <div className="flex items-center justify-between">
        <span className="text-sm text-neutral-600">When</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(condition.id)}
          className="text-red-500 hover:text-red-600 hover:bg-transparent px-0 h-auto font-normal"
        >
          Delete
        </Button>
      </div>

      <div className="space-y-2">
        <Select
          value={condition.fieldId}
          onValueChange={(value) => {
            onUpdate(condition.id, { 
              fieldId: value,
              operator: '',
              value: ''
            });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select field" />
          </SelectTrigger>
          <SelectContent>
            {availableFields.map((field) => (
              <SelectItem key={field.id} value={field.id}>
                {field.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedField && (
          <Select
            value={condition.operator}
            onValueChange={(value) => {
              onUpdate(condition.id, { 
                operator: value,
                value: '' // Reset value when operator changes
              });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select operator" />
            </SelectTrigger>
            <SelectContent>
              {operators.map((op) => (
                <SelectItem key={op.value} value={op.value}>
                  {op.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {selectedField && condition.operator && (
          <Select
            value={condition.value}
            onValueChange={(value) => onUpdate(condition.id, { value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select value" />
            </SelectTrigger>
            <SelectContent>
              {values.map((val) => (
                <SelectItem key={val.value} value={val.value}>
                  {val.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}