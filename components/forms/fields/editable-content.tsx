'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { useAutoResizeTextarea } from '@/hooks/use-auto-resize-textarea';
import { HoverActions } from './hover-actions';

interface EditableContentProps {
  value: string;
  onChange?: (value: string) => void;
  onAddField?: (type: string) => void;
  placeholder: string;
  editable?: boolean;
  className?: string;
}

export function EditableContent({
  value,
  onChange,
  onAddField,
  placeholder,
  editable = true,
  className,
}: EditableContentProps) {
  const [isHovered, setIsHovered] = useState(false);
  const textareaRef = useAutoResizeTextarea(value);

  return (
    <div
      className={cn(
        'group relative rounded-md p-2 transition-colors',
        isHovered && 'bg-[hsl(var(--muted))]'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'px-0 py-0 text-base border-0 focus-visible:ring-0 focus:outline-none focus-visible:ring-offset-0 w-full bg-transparent resize-none',
          'min-h-0 h-auto',
          className
        )}
        readOnly={!editable}
      />

      {editable && onAddField && (
        <HoverActions isHovered={isHovered} onAddField={onAddField} />
      )}
    </div>
  );
}