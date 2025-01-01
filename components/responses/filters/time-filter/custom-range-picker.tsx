'use client';

import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { DateRange } from './types';
import { format } from 'date-fns';

interface CustomRangePickerProps {
  initialRange?: DateRange;
  onRangeSelect: (range: DateRange) => void;
  onCancel: () => void;
}

export function CustomRangePicker({
  initialRange,
  onRangeSelect,
  onCancel,
}: CustomRangePickerProps) {
  const [dateRange, setDateRange] = useState<
    | {
        from: Date | undefined;
        to: Date | undefined;
      }
    | undefined
  >(
    initialRange
      ? {
          from: initialRange.from,
          to: initialRange.to,
        }
      : undefined
  );

  useEffect(() => {
    if (initialRange) {
      setDateRange({
        from: initialRange.from,
        to: initialRange.to,
      });
    }
  }, [initialRange]);

  const handleSelect = () => {
    if (dateRange?.from && dateRange?.to) {
      onRangeSelect({
        from: dateRange.from,
        to: dateRange.to,
      });
    }
  };

  return (
    <div>
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={value => {
          setDateRange(value?.to ? value as any : undefined);
        }}
        numberOfMonths={2}
        defaultMonth={dateRange?.from}
      />

      <div className="flex items-center justify-between p-3 border-t">
        <div className="text-sm text-muted-foreground">
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, 'LLL dd, y')} -{' '}
                {format(dateRange.to, 'LLL dd, y')}
              </>
            ) : (
              format(dateRange.from, 'LLL dd, y')
            )
          ) : (
            'Pick a date range'
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSelect}
            disabled={!dateRange?.from || !dateRange?.to}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
