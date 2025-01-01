'use client';

import { FormField } from '@/types/form';
import { CompletionMetrics } from './completion-metrics';
import { ResponseList } from './response-list';

interface TextSummaryProps {
  field: FormField;
  responses: any[];
}

export function TextSummary({ field, responses }: TextSummaryProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">{field.label}</h3>
        <CompletionMetrics field={field} responses={responses} />
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground">All Responses</h4>
        <ResponseList field={field} responses={responses} />
      </div>
    </div>
  );
}