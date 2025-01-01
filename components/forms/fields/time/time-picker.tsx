'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { TimeNumberInput } from './time-number-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { convertTo12Hour, convertTo24Hour, formatTime } from './time-format';

interface TimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  onClose: () => void;
}

export function TimePicker({ value, onChange, onClose }: TimePickerProps) {
  const [hour, setHour] = useState('12');
  const [minute, setMinute] = useState('00');
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');

  useEffect(() => {
    if (value) {
      const [time, meridiem] = value.split(' ');
      if (time && meridiem) {
        const [h, m] = time.split(':');
        if (h && m) {
          const hour24 = parseInt(h, 10);
          const { hour12, period } = convertTo12Hour(hour24);
          setHour(hour12.toString().padStart(2, '0'));
          setMinute(m);
          setPeriod(period);
        }
      }
    }
  }, [value]);

  const handleSelect = () => {
    const formattedTime = formatTime(hour, minute, period);
    onChange?.(formattedTime);
    onClose();
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1">
          <TimeNumberInput
            label="Hour"
            value={hour}
            onChange={setHour}
            min={1}
            max={12}
          />
        </div>

        <div className="flex-1">
          <TimeNumberInput
            label="Minute"
            value={minute}
            onChange={setMinute}
            min={0}
            max={59}
          />
        </div>

        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium">Period</label>
          <Select value={period} onValueChange={(value: 'AM' | 'PM') => setPeriod(value)}>
            <SelectTrigger>
              <SelectValue placeholder="AM/PM" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button className="w-full" onClick={handleSelect}>
        Select Time
      </Button>
    </div>
  );
}