'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BaseField } from './base-field';
import { FormField } from '@/types/form';
import { Star } from 'lucide-react';

interface StarRatingProps {
  field: FormField;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  value?: number;
  onChange?: (value: number) => void;
  error?: string;
}

export function StarRatingField({
  field,
  showLabel = true,
  showHelperText = false,
  preview = false,
  value,
  onChange,
  error,
}: StarRatingProps) {
  const [hover, setHover] = useState<number>(0);
  const maxStars = field.settings?.maxStars || 5;
  const allowHalf = field.settings?.allowHalfStars || false;
  const starValues = Array.from(
    { length: allowHalf ? maxStars * 2 : maxStars },
    (_, i) => (allowHalf ? (i + 1) / 2 : i + 1)
  );

  return (
    <BaseField
      field={field}
      showLabel={showLabel}
      showHelperText={showHelperText}
      error={error}
    >
      <div
        className={cn(
          'flex gap-1',
          error && 'pr-10' // Make space for error icon
        )}
      >
        {starValues.map((starValue) => {
          const isHalfStar = allowHalf && starValue % 1 !== 0;
          const starNumber = Math.ceil(starValue);
          const isFilled = (hover || value) >= starValue;
          const isHalfFilled =
            allowHalf &&
            (hover || value) >= starValue - 0.5 &&
            (hover || value) < starValue;

          return (
            <button
              key={starValue}
              type="button"
              className={cn(
                'star-rating_button p-1 relative bg-transparent h-8 w-8',
                'hover:scale-110 hover:bg-transparent',
                'focus-visible-only',
                'disabled:opacity-50 disabled:hover:scale-100',
                error && 'focus-visible:ring-red-500'
              )}
              onClick={() => onChange?.(starValue)}
              onMouseMove={(e) => {
                if (preview && !onChange) return;

                if (allowHalf) {
                  const button = e.currentTarget;
                  const rect = button.getBoundingClientRect();
                  const halfWidth = rect.width / 2;
                  const isLeftHalf = e.clientX - rect.left < halfWidth;
                  setHover(isLeftHalf ? starValue - 0.5 : starValue);
                } else {
                  setHover(starValue);
                }
              }}
              onMouseLeave={() => setHover(0)}
              disabled={preview && !onChange}
            >
              <Star
                className={cn(
                  'star-icon h-7 w-7 transition-colors',
                  isFilled
                    ? 'text-[var(--theme-primary)] fill-[var(--theme-primary)]'
                    : isHalfFilled
                    ? 'text-[var(--theme-primary)] fill-[url(#half)]'
                    : error
                    ? 'text-red-500'
                    : 'text-[var(--theme-border)]'
                )}
                strokeWidth={1.5}
              />
              {allowHalf && (
                <svg width="0" height="0">
                  <defs>
                    <linearGradient id="half">
                      <stop
                        offset="50%"
                        stopColor="fill-[var(--theme-primary)]"
                      />
                      <stop offset="50%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </BaseField>
  );
}
