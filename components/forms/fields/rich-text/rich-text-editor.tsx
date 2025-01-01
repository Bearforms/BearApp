'use client';

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { RichTextToolbar } from './rich-text-toolbar';
import { useRichTextEditor } from './use-rich-text-editor';

interface RichTextEditorProps {
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export function RichTextEditor({
  value,
  onChange,
  disabled,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const {
    handleFormat,
    handleKeyDown,
    handlePaste,
    isFormatActive,
    syncContent,
  } = useRichTextEditor(editorRef, onChange);

  // Sync content when value prop changes
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  return (
    <div
      className={cn(
        'rounded-md border bg-[var(--form-background)] transition-colors',
        'border-[var(--form-border)]',
        'focus-within:ring-2 focus-within:ring-[var(--form-primary)] focus-within:border-[var(--form-primary)]'
      )}
    >
      <RichTextToolbar
        onFormat={handleFormat}
        isFormatActive={isFormatActive}
        disabled={disabled}
      />
      <div
        ref={editorRef}
        contentEditable={!disabled}
        role="textbox"
        aria-multiline="true"
        className={cn(
          'min-h-[80px] max-h-[500px] overflow-y-auto p-3 outline-none',
          'prose prose-sm max-w-none',
          'focus:outline-none',
          disabled && 'cursor-not-allowed opacity-50'
        )}
        onInput={syncContent}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
      />
    </div>
  );
}
