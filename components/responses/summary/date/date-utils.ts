'use client';

import { FormField } from '@/types/form';
import { format, isWithinInterval, startOfDay, endOfDay, subDays } from 'date-fns';

export function getDateDistribution(field: FormField, responses: any[]): Record<string, number> {
  const distribution: Record<string, number> = {
    'Today': 0,
    'Yesterday': 0,
    'Last 7 days': 0,
    'Last 30 days': 0,
    'Older': 0
  };

  const now = new Date();
  const today = startOfDay(now);
  const yesterday = startOfDay(subDays(now, 1));
  const last7Days = startOfDay(subDays(now, 7));
  const last30Days = startOfDay(subDays(now, 30));

  responses.forEach(response => {
    const value = response.data[field.label];
    if (!value) return;

    try {
      const date = new Date(value);

      if (isWithinInterval(date, { start: today, end: endOfDay(now) })) {
        distribution['Today']++;
      } else if (isWithinInterval(date, { start: yesterday, end: endOfDay(yesterday) })) {
        distribution['Yesterday']++;
      } else if (isWithinInterval(date, { start: last7Days, end: endOfDay(now) })) {
        distribution['Last 7 days']++;
      } else if (isWithinInterval(date, { start: last30Days, end: endOfDay(now) })) {
        distribution['Last 30 days']++;
      } else {
        distribution['Older']++;
      }
    } catch (error) {
      console.error('Error parsing date:', error);
    }
  });

  return distribution;
}