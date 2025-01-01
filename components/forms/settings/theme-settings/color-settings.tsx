'use client';

import { ColorPicker } from './color-picker';
import { SettingsSection } from '../field-settings/settings-section';

interface ColorSettingsProps {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  textSecondaryColor: string; // Add secondary text color
  borderColor: string;
  onPrimaryColorChange: (color: string) => void;
  onBackgroundColorChange: (color: string) => void;
  onTextColorChange: (color: string) => void;
  onTextSecondaryColorChange: (color: string) => void; // Add handler
  onBorderColorChange: (color: string) => void;
}

export function ColorSettings({
  primaryColor,
  backgroundColor,
  textColor,
  textSecondaryColor,
  borderColor,
  onPrimaryColorChange,
  onBackgroundColorChange,
  onTextColorChange,
  onTextSecondaryColorChange,
  onBorderColorChange,
}: ColorSettingsProps) {
  return (
    <SettingsSection title="Colors">
      <div className="space-y-4">
        <ColorPicker
          label="Brand color"
          value={primaryColor}
          onChange={onPrimaryColorChange}
          placeholder="#2563eb"
        />

        <ColorPicker
          label="Form background"
          value={backgroundColor}
          onChange={onBackgroundColorChange}
          placeholder="#ffffff"
        />

        <ColorPicker
          label="Primary text"
          value={textColor}
          onChange={onTextColorChange}
          placeholder="#0f172a"
        />

        <ColorPicker
          label="Secondary text"
          value={textSecondaryColor}
          onChange={onTextSecondaryColorChange}
          placeholder="#6b7280"
        />

        <ColorPicker
          label="Border"
          value={borderColor}
          onChange={onBorderColorChange}
          placeholder="#e2e8f0"
        />
      </div>
    </SettingsSection>
  );
}
