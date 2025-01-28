'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { useAutoResizeTextarea } from '@/hooks/use-auto-resize-textarea';
import { HoverActions } from './hover-actions';
import { useFormStore } from '@/stores/form-store';

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

  const form = useFormStore(state => state.form);

  const primaryColor = form?.themeSettings?.colors?.text ?? "#f3f4f6";

  const getRGBA = () => {
    const r = parseInt(primaryColor.slice(1, 3), 16);
    const g = parseInt(primaryColor.slice(3, 5), 16);
    const b = parseInt(primaryColor.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${.10})`;
  };
  const hoverStyles = `
      .hover-preview:hover,
      .hover-preview:focus,
      .hover-preview:active
      {
        background-color: ${getRGBA()};
      }
    `;

  return (
    <>
      <style>{hoverStyles}</style>
      <div
        className={cn(
          'group relative rounded-md p-2 transition-colors',
          isHovered && 'hover-preview',
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
    </>
  );
}