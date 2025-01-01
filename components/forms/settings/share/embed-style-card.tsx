'use client';

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Maximize, Maximize2, LayoutTemplate } from 'lucide-react';

interface EmbedStyleCardProps {
  style: 'inline' | 'fullscreen' | 'modal';
  isSelected: boolean;
  onSelect: () => void;
}

const styleConfig = {
  inline: {
    icon: LayoutTemplate,
    title: 'Inline',
  },
  fullscreen: {
    icon: Maximize2,
    title: 'Fullscreen',
  },
  modal: {
    icon: Maximize,
    title: 'Modal',
  },
};

export function EmbedStyleCard({
  style,
  isSelected,
  onSelect,
}: EmbedStyleCardProps) {
  const config = styleConfig[style];
  const Icon = config.icon;

  return (
    <Card
      className={cn(
        'relative flex flex-col items-start gap-2 p-4 cursor-pointer transition-all shadow-sm hover:shadow-md',
        'border-[1.5px]',
        isSelected ? 'border-primary bg-primary/5' : 'hover:border-neutral-300'
      )}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between w-full">
        <Icon className="h-5 w-5 text-neutral-500" strokeWidth={1.5} />
        {isSelected && (
          <div className="h-2 w-2 rounded-full bg-primary absolute top-2 right-2" />
        )}
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium">{config.title}</h4>
        <p className="text-xs text-muted-foreground">{config.description}</p>
      </div>
    </Card>
  );
}
