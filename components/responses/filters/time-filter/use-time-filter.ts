'use client';

import { useState, useCallback } from 'react';
import { DateRange } from './types';
import { format } from 'date-fns';
import { TIME_FILTER_OPTIONS } from './constants';
import { useTimeFilterStore } from './time-filter-store';
import { validateDateRange } from './date-utils';

export function useTimeFilter() {
  const { preset, dateRange, setFilter } = useTimeFilterStore();
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const handlePresetChange = useCallback((value: string) => {
    if (value === 'custom') {
      setIsCustomOpen(true);
    } else {
      setFilter(value as any);
      setIsCustomOpen(false);
    }
  }, [setFilter]);

  const getDisplayText = useCallback(() => {
    if (preset === 'custom' && dateRange) {
      const validRange = validateDateRange(dateRange);
      if (!validRange) return 'Invalid date range';

      try {
        return `${format(validRange.from, 'MMM d')} - ${format(validRange.to, 'MMM d')}`;
      } catch {
        return 'Invalid date range';
      }
    }
    return TIME_FILTER_OPTIONS.find((option) => option.value === preset)?.label || 'All time';
  }, [preset, dateRange]);

  const handleRangeSelect = useCallback((range: DateRange) => {
    const validRange = validateDateRange(range);
    if (validRange) {
      setFilter('custom', validRange);
      setIsCustomOpen(false);
    }
  }, [setFilter]);

  const handleCancel = useCallback(() => {
    setIsCustomOpen(false);
    if (preset === 'custom' && !dateRange) {
      setFilter('all');
    }
  }, [preset, dateRange, setFilter]);

  return {
    preset,
    dateRange,
    isCustomOpen,
    displayText: getDisplayText(),
    handlePresetChange,
    handleRangeSelect,
    handleCancel,
    setIsCustomOpen
  };
}