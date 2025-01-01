'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ThankYouSettings as ThankYouSettingsType } from '@/types/form';
import { PanelLayout } from '../panel-layout';

interface ThankYouSettingsProps {
  settings: ThankYouSettingsType;
  onSettingsChange: (settings: ThankYouSettingsType) => void;
  onClose: () => void;
  themeSettings?: any;
}

export function ThankYouSettings({
  settings,
  onSettingsChange,
  onClose,
  themeSettings,
}: ThankYouSettingsProps) {
  return (
    <PanelLayout
      title="Thank you page"
      onClose={onClose}
      themeSettings={themeSettings}
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="font-normal">Heading</Label>
            <Input
              value={settings.heading}
              onChange={(e) =>
                onSettingsChange({ ...settings, heading: e.target.value })
              }
              placeholder="Thank you for your submission"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-normal">Message</Label>
            <Textarea
              value={settings.message}
              onChange={(e) =>
                onSettingsChange({ ...settings, message: e.target.value })
              }
              placeholder="Your response has been recorded"
              className="min-h-[100px] resize-y"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="font-normal">Show button</Label>
              <p className="text-sm text-muted-foreground">
                Add a call-to-action button
              </p>
            </div>
            <Switch
              checked={settings.showButton}
              onCheckedChange={(checked) =>
                onSettingsChange({ ...settings, showButton: checked })
              }
            />
          </div>

          {settings.showButton && (
            <>
              <div className="space-y-2">
                <Label className="font-normal">Button text</Label>
                <Input
                  value={settings.buttonText}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      buttonText: e.target.value,
                    })
                  }
                  placeholder="Continue"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-normal">Button URL</Label>
                <Input
                  type="url"
                  value={settings.buttonUrl}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      buttonUrl: e.target.value,
                    })
                  }
                  placeholder="https://example.com"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </PanelLayout>
  );
}