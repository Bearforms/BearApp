'use client';

import { ThankYouSettings, ThemeSettings } from '@/types/form';
import { Button } from '@/components/ui/button';
import { HeadingField } from '../fields/heading-field';
import { ParagraphField } from '../fields/paragraph-field';
import { cn } from '@/lib/utils';

interface ThankYouContentProps {
  settings: ThankYouSettings;
  themeSettings?: ThemeSettings;
}

export function ThankYouContent({
  settings,
  themeSettings,
}: ThankYouContentProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="thank-you-heading">
          <HeadingField
            field={{
              id: 'thank-you-heading',
              type: 'heading',
              label: 'Thank You',
              content: settings.heading,
              settings: { headingLevel: 1 },
            }}
            preview
            headingFont={themeSettings?.fonts?.heading}
          />
        </div>
        <div className="thank-you-message">
          <ParagraphField
            field={{
              id: 'thank-you-message',
              type: 'paragraph',
              label: 'Message',
              content: settings.message,
            }}
            preview
          />
        </div>
      </div>
      {settings.showButton && (
        <Button
          variant="outline"
          className={cn('rounded-[var(--form-radius)]')}
          onClick={() => {
            if (settings.buttonUrl) {
              window.open(settings.buttonUrl, '_blank');
            }
          }}
          style={{
            borderRadius: 'var(--form-radius)',
          }}
        >
          {settings.buttonText}
        </Button>
      )}
    </div>
  );
}