'use client';

import { FormField } from '@/types/form';
import { Card } from '@/components/ui/card';

interface CompletionMetricsProps {
  field: FormField;
  responses: any[];
}

export function CompletionMetrics({ field, responses }: CompletionMetricsProps) {
  // Calculate metrics
  const totalResponses = responses.length;
  const filledResponses = responses.filter(r => {
    const value = r.data[field.label];
    return value !== undefined && value !== null && value.trim() !== '';
  }).length;
  const emptyResponses = totalResponses - filledResponses;
  const completionRate = totalResponses > 0 ? (filledResponses / totalResponses) * 100 : 0;

  // Calculate invalid entries (if validation pattern exists)
  let invalidResponses = 0;
  if (field.validation?.pattern) {
    const pattern = new RegExp(field.validation.pattern);
    invalidResponses = responses.filter(r => {
      const value = r.data[field.label];
      return value && !pattern.test(value);
    }).length;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card className="p-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">
          Completion Rate
        </h4>
        <p className="text-2xl font-bold">{completionRate.toFixed(1)}%</p>
        <p className="text-sm text-muted-foreground mt-1">
          {filledResponses} of {totalResponses} responses
        </p>
      </Card>

      <Card className="p-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">
          Empty Responses
        </h4>
        <p className="text-2xl font-bold">{emptyResponses}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {((emptyResponses / totalResponses) * 100).toFixed(1)}% of total
        </p>
      </Card>

      {field.validation?.pattern && (
        <Card className="p-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            Invalid Entries
          </h4>
          <p className="text-2xl font-bold">{invalidResponses}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {((invalidResponses / filledResponses) * 100).toFixed(1)}% of filled responses
          </p>
        </Card>
      )}
    </div>
  );
}