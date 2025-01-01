'use client';

import { HeadingField } from './fields/heading-field';
import { ParagraphField } from './fields/paragraph-field';
import { Button } from '@/components/ui/button';
import { ThankYouSettings } from '@/types/form';

interface ThankYouPageProps {
  settings: ThankYouSettings;
  onClose: () => void;
}

export function ThankYouPage({ settings, onClose }: ThankYouPageProps) {
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
    <div className="space-y-6">
      <HeadingField field={headingField as any} preview />
      <ParagraphField field={paragraphField} preview />
      <div className="flex gap-3">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        {settings.showButton && (
          <Button
            variant={settings.buttonStyle}
            onClick={() => {
              if (settings.buttonUrl) {
                window.open(settings.buttonUrl, '_blank');
              }
            }}
          >
            {settings.buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}