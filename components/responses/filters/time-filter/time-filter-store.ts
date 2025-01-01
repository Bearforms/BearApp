'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DateRange } from './types';
import { getPresetDateRange, validateDateRange } from './date-utils';

export type TimeFilterPreset = 'all' | 'today' | '7days' | '30days' | '3months' | 'custom';

interface TimeFilterState {
  preset: TimeFilterPreset;
  dateRange: DateRange | null;
  setFilter: (preset: TimeFilterPreset, dateRange?: DateRange) => void;
  resetFilter: () => void;
}

export const useTimeFilterStore = create<TimeFilterState>()(
  persist(
    (set) => ({
      preset: 'all',
      dateRange: null,
      setFilter: (preset, dateRange) => {
        if (preset === 'custom') {
          const validRange = validateDateRange(dateRange || null);
          if (!validRange) return; // Don't update if custom range is invalid
          
          set({ preset, dateRange: validRange });
        } else {
          const newDateRange = getPresetDateRange(preset);
          set({ preset, dateRange: newDateRange });
        }
      },
      resetFilter: () => set({ preset: 'all', dateRange: null }),
    }),
    {
      name: 'time-filter-storage',
      version: 1,
    }
  )
);