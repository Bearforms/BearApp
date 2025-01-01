'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

interface EmbedSettings {
  width: string;
  height: string;
  hideHeader: boolean;
  allowFullscreen: boolean;
}

interface EmbedOptionsProps {
  style: 'inline' | 'fullscreen' | 'modal';
  settings: EmbedSettings;
  onSettingsChange: (settings: EmbedSettings) => void;
}

export function EmbedOptions({ style, settings, onSettingsChange }: EmbedOptionsProps) {
  return (
    <div className="space-y-4">
      {style === 'inline' && (
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label className="font-normal">Width</Label>
            <Input
              value={settings.width}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  width: e.target.value,
                })
              }
              placeholder="e.g., 100%, 500px"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-normal">Height</Label>
            <Input
              value={settings.height}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  height: e.target.value,
                })
              }
              placeholder="e.g., 500px"
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="font-normal">Hide header</Label>
          <p className="text-sm text-muted-foreground">
            Remove the form header in embedded view
          </p>
        </div>
        <Switch
          checked={settings.hideHeader}
          onCheckedChange={(checked) =>
            onSettingsChange({
              ...settings,
              hideHeader: checked,
            })
          }
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="font-normal">Allow fullscreen</Label>
          <p className="text-sm text-muted-foreground">
            Enable fullscreen mode for the embedded form
          </p>
        </div>
        <Switch
          checked={settings.allowFullscreen}
          onCheckedChange={(checked) =>
            onSettingsChange({
              ...settings,
              allowFullscreen: checked,
            })
          }
        />
      </div>
    </div>
  );
}