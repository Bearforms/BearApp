'use client';

import { FormField } from '@/types/form';
import { Card } from '@/components/ui/card';
import { getFieldCompletionStats } from './field-stats';

interface CompletionMetricsProps {
  field: FormField;
  responses: any[];
}

export function CompletionMetrics({
  field,
  responses,
}: CompletionMetricsProps) {
  const stats = getFieldCompletionStats(field, responses);

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card className="p-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">
          Completion Rate
        </h4>
        <p className="text-2xl font-bold">{stats.completionRate.toFixed(1)}%</p>
        <p className="text-sm text-muted-foreground mt-1">
          {stats.filledResponses} of {stats.totalResponses} responses
        </p>
      </Card>

      <Card className="p-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">
          Empty Responses
        </h4>
        <p className="text-2xl font-bold">{stats.emptyResponses}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {stats.emptyRate.toFixed(1)}% of total
        </p>
      </Card>
    </div>
  );
}
