'use client';

import { EmbedStyleCard } from './embed-style-card';

interface EmbedStylesProps {
  value: 'inline' | 'fullscreen' | 'modal';
  onChange: (value: 'inline' | 'fullscreen' | 'modal') => void;
}

export function EmbedStyles({ value, onChange }: EmbedStylesProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-sm font-medium">Embed options</h3>
        <p className="text-sm text-muted-foreground">
          Choose how your form appears when embedded
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <EmbedStyleCard
          style="inline"
          isSelected={value === 'inline'}
          onSelect={() => onChange('inline')}
        />
        <EmbedStyleCard
          style="fullscreen"
          isSelected={value === 'fullscreen'}
          onSelect={() => onChange('fullscreen')}
        />
        <EmbedStyleCard
          style="modal"
          isSelected={value === 'modal'}
          onSelect={() => onChange('modal')}
        />
      </div>
    </div>
  );
}
