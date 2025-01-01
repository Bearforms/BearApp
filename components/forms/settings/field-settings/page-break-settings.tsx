'use client';

import { FormField } from '@/types/form';
import { SettingsSection } from './settings-section';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { StepConditions } from './step-conditions/step-conditions';

interface PageBreakSettingsProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
  fields: FormField[];
}

export function PageBreakSettings({ field, onFieldUpdate, fields }: PageBreakSettingsProps) {
  if (field.type !== 'page-break') return null;

  return (
    <div className="space-y-8">
      <SettingsSection title="Step Settings">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="font-normal">Step Title</Label>
            <Input
              value={field.settings?.stepTitle || ''}
              onChange={(e) =>
                onFieldUpdate({
                  ...field,
                  settings: {
                    ...field.settings,
                    stepTitle: e.target.value,
                  },
                })
              }
              placeholder="Enter step title"
            />
            <p className="text-sm text-muted-foreground">
              The title shown in the progress bar for this step
            </p>
          </div>

          <div className="space-y-2">
            <Label className="font-normal">Step Description</Label>
            <Textarea
              value={field.settings?.stepDescription || ''}
              onChange={(e) =>
                onFieldUpdate({
                  ...field,
                  settings: {
                    ...field.settings,
                    stepDescription: e.target.value,
                  },
                })
              }
              placeholder="Enter step description"
              className="resize-y min-h-[100px]"
            />
            <p className="text-sm text-muted-foreground">
              Optional description shown below the step title
            </p>
          </div>
        </div>
      </SettingsSection>

      <StepConditions 
        field={field}
        onFieldUpdate={onFieldUpdate}
        fields={fields}
      />
    </div>
  );
}