'use client';

import { cn } from '@/lib/utils';

interface RichTextPreviewProps {
  content: string;
  className?: string;
}

export function RichTextPreview({ content, className }: RichTextPreviewProps) {
  if (!content) {
    return null;
  }

  return (
    <div
      className={cn(
        'prose prose-sm max-w-none text-[var(--form-text)]',
        'rounded-md',
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
