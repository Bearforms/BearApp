'use client';

import { FormField } from '@/types/form';
import { CompletionMetrics } from '../metrics/completion-metrics';
import { TimeList } from './time-list';

interface TimeSummaryProps {
  field: FormField;
  responses: any[];
}

export function TimeSummary({ field, responses }: TimeSummaryProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">{field.label}</h3>
        <CompletionMetrics field={field} responses={responses} />
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground">All Responses</h4>
        <TimeList field={field} responses={responses} />
      </div>
    </div>
  );
}