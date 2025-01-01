'use client';

import { TimeFilterSelect } from './time-filter-select';
import { TimeFilterPopover } from './time-filter-popover';
import { useTimeFilter } from './use-time-filter';

export function TimeFilter() {
  const {
    preset,
    dateRange,
    isCustomOpen,
    displayText,
    handlePresetChange,
    handleRangeSelect,
    handleCancel,
    setIsCustomOpen
  } = useTimeFilter();

  return (
    <div className="relative w-full">
      <TimeFilterSelect
        value={preset}
        displayText={displayText}
        onValueChange={handlePresetChange}
      />

      <TimeFilterPopover
        isOpen={isCustomOpen}
        onOpenChange={setIsCustomOpen}
        dateRange={dateRange}
        onRangeSelect={handleRangeSelect}
        onCancel={handleCancel}
      />
    </div>
  );
}