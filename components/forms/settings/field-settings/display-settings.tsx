'use client';

import { FormField } from '@/types/form';
import { Maximize2, Columns } from 'lucide-react';
import { SettingsSection } from './settings-section';
import { SettingsToggle } from './settings-toggle';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface DisplaySettingsProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
}

export function DisplaySettings({
  field,
  onFieldUpdate,
}: DisplaySettingsProps) {
  // Skip display settings for content fields
  if (field.type === 'heading' || field.type === 'paragraph') {
    return null;
  }

  return (
    <SettingsSection title="Field settings">
      <div className="space-y-6">
        {/* Width settings */}
        <div className="space-y-3">
          <Label className="text-sm font-normal">Field width</Label>
          <RadioGroup
            value={field.settings?.width || 'full'}
            onValueChange={(value) =>
              onFieldUpdate({
                ...field,
                settings: {
                  ...field.settings,
                  width: value as 'full' | 'half',
                },
              })
            }
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <RadioGroupItem value="full" id="full" className="peer sr-only" />
              <Label
                htmlFor="full"
                className="flex items-center space-x-2 rounded-md border-[1.5px] border-neutral-200 bg-transparent p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <Maximize2 className="h-4 w-4 text-neutral-500" />
                <span className="text-sm font-normal">Full</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="half" id="half" className="peer sr-only" />
              <Label
                htmlFor="half"
                className="flex items-center space-x-2 rounded-md border-[1.5px] border-neutral-200 bg-transparent p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <Columns className="h-4 w-4 text-neutral-500" />
                <span className="text-sm font-normal">Half</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Label settings */}
        <div className="space-y-4">
          <SettingsToggle
            label="Show label"
            description="Display the field label above the input"
            checked={field.settings?.showLabel !== false}
            onCheckedChange={(checked) =>
              onFieldUpdate({
                ...field,
                settings: {
                  ...field.settings,
                  showLabel: checked,
                },
              })
            }
          />
          {field.settings?.showLabel !== false && (
            <Textarea
              value={field.label || ''}
              onChange={(e) =>
                onFieldUpdate({ ...field, label: e.target.value })
              }
              placeholder="Enter field label"
            />
          )}
        </div>

        {/* Placeholder settings */}
        <div className="space-y-4">
          <SettingsToggle
            label="Show placeholder"
            description="Show placeholder text inside the input field"
            checked={field.settings?.showPlaceholder !== false}
            onCheckedChange={(checked) =>
              onFieldUpdate({
                ...field,
                settings: {
                  ...field.settings,
                  showPlaceholder: checked,
                },
              })
            }
          />
          {field.settings?.showPlaceholder !== false && (
            <Input
              value={field.placeholder || ''}
              onChange={(e) =>
                onFieldUpdate({ ...field, placeholder: e.target.value })
              }
              placeholder="Enter placeholder text"
            />
          )}
        </div>

        {/* Helper text settings */}
        <div className="space-y-4">
          <SettingsToggle
            label="Show helper text"
            description="Display additional help text above the field"
            checked={field.settings?.showHelperText || false}
            onCheckedChange={(checked) =>
              onFieldUpdate({
                ...field,
                settings: {
                  ...field.settings,
                  showHelperText: checked,
                },
              })
            }
          />
          {field.settings?.showHelperText && (
            <Textarea
              value={field.helperText || ''}
              onChange={(e) =>
                onFieldUpdate({ ...field, helperText: e.target.value })
              }
              placeholder="Enter helper text"
            />
          )}
        </div>
      </div>
    </SettingsSection>
  );
}
