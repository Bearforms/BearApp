'use client';

import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { calculateAverageCompletionTime } from '@/lib/utils/response-stats';

interface ResponseStatsProps {
  responses: any[];
}

export function ResponseStats({ responses }: ResponseStatsProps) {
  const totalResponses = responses.length;
  const lastResponse = responses[0]?.submittedAt;
  const averageTimeToComplete = calculateAverageCompletionTime(responses);

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card className="p-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">
          Total Responses
        </h4>
        <p className="text-2xl font-bold">{totalResponses}</p>
      </Card>

      <Card className="p-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">
          Last Response
        </h4>
        <p className="text-2xl font-bold">
          {lastResponse
            ? formatDistanceToNow(new Date(lastResponse), { addSuffix: true })
            : 'No responses'}
        </p>
      </Card>

      <Card className="p-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">
          Avg. Completion Time
        </h4>
        <p className="text-2xl font-bold">{averageTimeToComplete}</p>
      </Card>
    </div>
  );
}