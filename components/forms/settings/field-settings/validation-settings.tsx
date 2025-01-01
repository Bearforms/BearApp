'use client';

import { FormField } from '@/types/form';
import { SettingsSection } from './settings-section';
import { SettingsToggle } from './settings-toggle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ValidationSettingsProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
}

export function ValidationSettings({
  field,
  onFieldUpdate,
}: ValidationSettingsProps) {
  const isContentField = field.type === 'heading' || field.type === 'paragraph';

  // Don't show validation settings for content fields
  if (isContentField) return null;

  return (
    <SettingsSection title="Validation">
      <div className="space-y-4">
        <SettingsToggle
          label="Required field"
          description="Make this field mandatory"
          checked={field.validation?.required || false}
          onCheckedChange={(checked) =>
            onFieldUpdate({
              ...field,
              validation: {
                ...field.validation,
                required: checked,
              },
            })
          }
        />

        {(field.type === 'text' || field.type === 'textarea') && (
          <div className="space-y-2">
            <Label className="font-normal">Maximum length</Label>
            <Input
              type="number"
              min="0"
              value={field.validation?.maxLength || ''}
              onChange={(e) =>
                onFieldUpdate({
                  ...field,
                  validation: {
                    ...field.validation,
                    maxLength: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  },
                })
              }
              placeholder="No maximum"
            />
          </div>
        )}
      </div>
    </SettingsSection>
  );
}