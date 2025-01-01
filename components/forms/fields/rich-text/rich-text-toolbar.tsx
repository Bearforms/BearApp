'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TOOLBAR_ITEMS } from './toolbar-config';

interface RichTextToolbarProps {
  onFormat: (command: string, value?: string) => void;
  isFormatActive: (format: string) => boolean;
  disabled?: boolean;
}

export function RichTextToolbar({
  onFormat,
  isFormatActive,
  disabled,
}: RichTextToolbarProps) {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 border-b border-[var(--form-border)] p-1">
        {TOOLBAR_ITEMS.map((group, groupIndex) => (
          <div key={group.group} className="flex items-center gap-0.5">
            {groupIndex > 0 && (
              <Separator orientation="vertical" className="mx-1 h-6" />
            )}
            {group.items.map((item) => (
              <Tooltip key={item.command}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'h-8 w-8 p-0 text-[var(--form-text)]',
                      isFormatActive(item.command) && 'bg-muted',
                      disabled && 'pointer-events-none opacity-50'
                    )}
                    onClick={() => onFormat(item.command)}
                    disabled={disabled}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="sr-only">{item.label}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <div className="text-sm">
                    {item.label}
                    <span className="ml-2 text-xs text-muted-foreground">
                      {item.shortcut}
                    </span>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
}
