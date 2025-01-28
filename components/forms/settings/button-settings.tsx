'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ButtonSettings as ButtonSettingsType } from '@/types/button';
import { PanelLayout } from './panel-layout';
import { defaultButtonSettings } from '@/lib/constants/theme-defaults';

interface ButtonSettingsProps {
  settings?: ButtonSettingsType;
  onSettingsChange: (settings: ButtonSettingsType) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  themeSettings?: any;
}

export function ButtonSettings({
  settings = defaultButtonSettings,
  onSettingsChange,
  open,
  onOpenChange,
  themeSettings,
}: ButtonSettingsProps) {

  settings = settings || defaultButtonSettings;

  return (
    <PanelLayout
      title="Button Settings"
      onClose={() => onOpenChange(false)}
      themeSettings={themeSettings}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="font-normal">Label</Label>
          <Input
            value={settings.label}
            onChange={(e) =>
              onSettingsChange({ ...settings, label: e.target.value })
            }
            placeholder="Button label"
          />
        </div>

        <div className="space-y-2">
          <Label className="font-normal">Size</Label>
          <Select
            value={settings.size}
            onValueChange={(value: ButtonSettingsType['size']) =>
              onSettingsChange({ ...settings, size: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label className="font-normal">Full Width</Label>
          <Switch
            checked={settings.fullWidth}
            onCheckedChange={(checked) =>
              onSettingsChange({ ...settings, fullWidth: checked })
            }
          />
        </div>
      </div>
    </PanelLayout>
  );
}
