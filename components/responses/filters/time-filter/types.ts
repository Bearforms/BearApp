'use client';

export interface DateRange {
  from: Date;
  to: Date;
}

export type TimeFilterPreset = 'all' | 'today' | '7days' | '30days' | '3months' | 'custom';

export interface TimeFilterOption {
  value: string;
  label: string;
}