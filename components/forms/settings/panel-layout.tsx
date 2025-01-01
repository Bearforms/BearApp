'use client';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThemeSettings } from '@/types/form';

interface PanelLayoutProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  themeSettings?: ThemeSettings;
}

export function PanelLayout({
  title,
  onClose,
  children,
  themeSettings,
}: PanelLayoutProps) {
  return (
    <div className="h-full flex flex-col bg-white settings-panel">
      <div className="flex items-center justify-between px-4 h-[52px] border-b border-neutral-100">
        <div className="text-base font-medium">{title}</div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">{children}</div>
      </ScrollArea>
    </div>
  );
}
