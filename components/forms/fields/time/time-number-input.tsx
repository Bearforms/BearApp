'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface TimeNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  min: number;
  max: number;
  label: string;
  className?: string;
}

export function TimeNumberInput({
  value,
  onChange,
  min,
  max,
  label,
  className
}: TimeNumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-digits
    let newValue = e.target.value.replace(/\D/g, '');
    
    // Don't pad with zeros while typing
    if (newValue === '') {
      onChange('00');
      return;
    }

    const numValue = parseInt(newValue, 10);
    
    // Only enforce min/max on blur or if value is complete
    if (newValue.length >= 2) {
      if (numValue < min) newValue = min.toString();
      if (numValue > max) newValue = max.toString();
    }
    
    // Only pad with zeros on blur or if value is complete
    onChange(newValue.length >= 2 ? newValue.padStart(2, '0') : newValue);
  };

  const handleBlur = () => {
    const numValue = parseInt(value || '0', 10);
    // Enforce min/max and pad with zeros on blur
    let finalValue = Math.max(min, Math.min(max, numValue));
    onChange(finalValue.toString().padStart(2, '0'));
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={cn("text-center w-16", className)}
        aria-label={label}
        maxLength={2}
      />
    </div>
  );
}