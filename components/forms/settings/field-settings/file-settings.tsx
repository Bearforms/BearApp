'use client';

import { FormField } from '@/types/form';
import { SettingsSection } from './settings-section';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Toggle } from './toggle';

interface FileSettingsProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
}

export function FileSettings({ field, onFieldUpdate }: FileSettingsProps) {
  if (field.type !== 'file') return null;

  return (
    <SettingsSection title="File upload settings">
      <div className="space-y-4">
        <div className="space-y-2">
          <div>
            <Label className="font-normal">Max file size (MB)</Label>
            <p className="text-sm text-muted-foreground">
              Leave empty for no size limit
            </p>
          </div>
          <Input
            type="number"
            min="0"
            value={field.settings?.maxFileSize || ''}
            onChange={(e) =>
              onFieldUpdate({
                ...field,
                settings: {
                  ...field.settings,
                  maxFileSize: Number(e.target.value),
                },
              })
            }
            placeholder="Enter max file size in MB"
          />
        </div>

        <div className="space-y-2">
          <div>
            <Label className="font-normal">Accepted file types</Label>
            <p className="text-sm text-muted-foreground">
              Enter file extensions separated by commas (e.g., .pdf, .doc)
            </p>
          </div>
          <Input
            value={field.settings?.acceptedFileTypes?.join(', ') || ''}
            onChange={(e) =>
              onFieldUpdate({
                ...field,
                settings: {
                  ...field.settings,
                  acceptedFileTypes: e.target.value
                    .split(',')
                    .map((t) => t.trim()),
                },
              })
            }
            placeholder=".pdf, .doc, .docx"
          />
        </div>

        <Toggle
          label="Allow multiple files"
          description="Enable users to upload multiple files at once"
          checked={field.settings?.multiple || false}
          onCheckedChange={(checked) =>
            onFieldUpdate({
              ...field,
              settings: {
                ...field.settings,
                multiple: checked,
              },
            })
          }
        />
      </div>
    </SettingsSection>
  );
}
