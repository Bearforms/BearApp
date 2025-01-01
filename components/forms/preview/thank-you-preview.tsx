'use client';

import { useState } from 'react';
import { HeadingField } from '../fields/heading-field';
import { ParagraphField } from '../fields/paragraph-field';
import { Button } from '@/components/ui/button';
import { ThankYouSettings, ThemeSettings } from '@/types/form';
import { Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThankYouPreviewProps {
  settings: ThankYouSettings;
  onEdit: () => void;
  preview?: boolean;
  themeSettings?: ThemeSettings;
}

export function ThankYouPreview({
  settings,
  onEdit,
  preview = false,
  themeSettings,
}: ThankYouPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  const headingField = {
    id: 'thank-you-heading',
    type: 'heading' as const,
    label: 'Thank You',
    content: settings.heading,
    settings: {
      headingLevel: 1,
    },
  };

  const paragraphField = {
    id: 'thank-you-paragraph',
    type: 'paragraph' as const,
    label: 'Message',
    content: settings.message,
  };

  return (
    <div
      className={cn(
        'group relative rounded-md transition-colors p-4 mt-8',
        !preview && 'hover:bg-[hsl(var(--muted))]'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!preview && (
        <div
          className={cn(
            'absolute -top-9 right-0 opacity-0 transition-opacity bg-white border-[0.5px] border-neutral-200 shadow-sm rounded-md overflow-hidden p-0',
            'group-hover:opacity-100'
          )}
        >
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-none"
            onClick={onEdit}
          >
            <Settings2 className="h-5 w-5 text-neutral-500" />
          </Button>
        </div>
      )}

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="thank-you-heading">
            <HeadingField
              field={headingField}
              preview
              headingFont={themeSettings?.fonts?.heading}
            />
          </div>
          <div className="thank-you-description">
            <ParagraphField field={paragraphField} preview />
          </div>
          {settings.showButton && (
            <Button
              variant={settings.buttonStyle || 'primary'}
              className={cn(
                'rounded-[var(--form-radius)] border border-[var(--form-border)] bg-[var(--form-background)] text-[var(--form-text-primary)] form-body'
              )}
              onClick={() => {
                if (settings.buttonUrl && !preview) {
                  window.open(settings.buttonUrl, '_blank');
                }
              }}
            >
              {settings.buttonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
