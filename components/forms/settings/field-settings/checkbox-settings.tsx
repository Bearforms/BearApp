'use client';

import { FormField } from '@/types/form';
import { SettingsSection } from './settings-section';
import { Textarea } from '@/components/ui/textarea';

interface CheckboxSettingsProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
}

export function CheckboxSettings({
  field,
  onFieldUpdate,
}: CheckboxSettingsProps) {
  if (field.type !== 'checkbox') return null;

  return (
    <SettingsSection title="Checkbox description">
      <div className="space-y-4">
        <Textarea
          value={field.settings?.checkboxText || ''}
          onChange={(e) =>
            onFieldUpdate({
              ...field,
              settings: {
                ...field.settings,
                checkboxText: e.target.value,
              },
            })
          }
          placeholder="Enter checkbox description"
          className="min-h-[100px] resize-y"
        />
      </div>
    </SettingsSection>
  );
}
