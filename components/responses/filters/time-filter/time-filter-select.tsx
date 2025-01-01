'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import { TIME_FILTER_OPTIONS } from './constants';

interface TimeFilterSelectProps {
  value: string;
  displayText: string;
  onValueChange: (value: string) => void;
}

export function TimeFilterSelect({
  value,
  displayText,
  onValueChange,
}: TimeFilterSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full h-9">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-neutral-500" strokeWidth={2} />
          <SelectValue>{displayText}</SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent>
        {TIME_FILTER_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
