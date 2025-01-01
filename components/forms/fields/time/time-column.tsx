'use client';

import { cn } from '@/lib/utils';

interface TimeColumnProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export function TimeColumn({
  label,
  value,
  options,
  onChange,
}: TimeColumnProps) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-2">{label}</label>
      <div className="h-48 w-20 rounded-md border">
        <div className="overflow-y-auto">
          <div className="h-auto">
            {options.map((option) => (
              <button
                key={option}
                className={cn(
                  'w-full px-3 py-2 text-sm text-center transition-colors',
                  'hover:bg-neutral-100',
                  value === option && 'bg-primary text-primary-foreground hover:bg-primary/90'
                )}
                onClick={() => onChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}