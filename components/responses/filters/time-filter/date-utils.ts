'use client';

import { startOfDay, endOfDay, subDays, subMonths, isValid, parseISO } from 'date-fns';
import { DateRange } from './types';

export function validateDate(date: Date | string | number): Date | null {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : new Date(date);
    return isValid(parsedDate) ? parsedDate : null;
  } catch {
    return null;
  }
}

export function validateDateRange(range: DateRange | null): DateRange | null {
  if (!range) return null;

  const fromDate = validateDate(range.from);
  const toDate = validateDate(range.to);

  if (!fromDate || !toDate) return null;

  return {
    from: fromDate,
    to: toDate
  };
}

export function createDateRange(from: Date, to: Date): DateRange | null {
  const validFrom = validateDate(from);
  const validTo = validateDate(to);

  if (!validFrom || !validTo) return null;

  return { from: validFrom, to: validTo };
}

export function getPresetDateRange(preset: string): DateRange | null {
  const now = new Date();
  
  switch (preset) {
    case 'today': {
      const start = startOfDay(now);
      const end = endOfDay(now);
      return createDateRange(start, end);
    }
    case '7days': {
      const start = startOfDay(subDays(now, 7));
      const end = endOfDay(now);
      return createDateRange(start, end);
    }
    case '30days': {
      const start = startOfDay(subDays(now, 30));
      const end = endOfDay(now);
      return createDateRange(start, end);
    }
    case '3months': {
      const start = startOfDay(subMonths(now, 3));
      const end = endOfDay(now);
      return createDateRange(start, end);
    }
    case 'all':
    default:
      return null;
  }
}