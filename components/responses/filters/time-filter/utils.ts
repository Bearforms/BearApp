'use client';

import { DateRange } from './types';
import { validateDate, validateDateRange } from './date-utils';

export function isWithinDateRange(date: Date | string | number, range: DateRange | null): boolean {
  if (!range) return true;

  const validRange = validateDateRange(range);
  if (!validRange) return true; // If range is invalid, don't filter

  const validDate = validateDate(date);
  if (!validDate) return false; // If date is invalid, exclude it

  const timestamp = validDate.getTime();
  const fromTime = validRange.from.getTime();
  const toTime = validRange.to.getTime();

  return timestamp >= fromTime && timestamp <= toTime;
}