'use client';

import { FormResponse } from '@/stores/response-store';

export function calculateAverageCompletionTime(responses: FormResponse[]): string {
  if (!responses.length) return 'No responses';

  // Sort responses by submission time
  const sortedResponses = [...responses].sort((a, b) => 
    new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
  );

  // Calculate time differences between consecutive submissions
  const timeDiffs: number[] = [];
  for (let i = 1; i < sortedResponses.length; i++) {
    const diff = new Date(sortedResponses[i].submittedAt).getTime() - 
                new Date(sortedResponses[i-1].submittedAt).getTime();
    
    // Only include reasonable time differences (< 30 minutes)
    // This helps filter out outliers where people may have left the form open
    if (diff < 30 * 60 * 1000) {
      timeDiffs.push(diff);
    }
  }

  if (!timeDiffs.length) return 'Unknown';

  // Calculate average time in milliseconds
  const avgTime = timeDiffs.reduce((sum, diff) => sum + diff, 0) / timeDiffs.length;

  // Format the time
  if (avgTime < 60000) { // Less than 1 minute
    return `${Math.round(avgTime / 1000)} seconds`;
  } else if (avgTime < 3600000) { // Less than 1 hour
    return `${Math.round(avgTime / 60000)} minutes`;
  } else {
    return `${Math.round(avgTime / 3600000)} hours`;
  }
}