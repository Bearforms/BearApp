"use client";

import { FormField } from "@/types/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  className?: string;
}

export function EditableField({
  value,
  onChange,
  placeholder,
  multiline = false,
  className
}: EditableFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.stopPropagation();
    onChange(e.target.value);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (multiline) {
    return (
      <Textarea
        value={value}
        onChange={handleChange}
        onClick={handleClick}
        placeholder={placeholder}
        className={className}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = 'auto';
          target.style.height = target.scrollHeight + 'px';
        }}
      />
    );
  }

  return (
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
      placeholder={placeholder}
      className={className}
    />
  );
}