'use client';

import { useState, useEffect } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CustomRangePicker } from './custom-range-picker';
import { DateRange } from './types';
import { Button } from '@/components/ui/button';

interface TimeFilterPopoverProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  dateRange: DateRange | null;
  onRangeSelect: (range: DateRange) => void;
  onCancel: () => void;
}

export function TimeFilterPopover({
  isOpen,
  onOpenChange,
  dateRange,
  onRangeSelect,
  onCancel,
}: TimeFilterPopoverProps) {
  return (
    <Popover open={isOpen} onOpenChange={onOpenChange} modal={true}>
      <PopoverTrigger asChild>
        <div className="w-0 h-0 overflow-hidden">
          <Button variant="ghost">Trigger</Button>
        </div>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0" 
        align="start" 
        side="bottom" 
        sideOffset={4}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <CustomRangePicker
          initialRange={dateRange || undefined}
          onRangeSelect={onRangeSelect}
          onCancel={onCancel}
        />
      </PopoverContent>
    </Popover>
  );
}