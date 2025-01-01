'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import { FormField } from '@/types/form';
import { SettingsSection } from './settings-section';
import { Toggle } from './toggle';

interface DropdownSettingsProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
}

export function DropdownSettings({ field, onFieldUpdate }: DropdownSettingsProps) {
  if (field.type !== 'dropdown') return null;

  const handleAddOption = () => {
    const newOptions = [...(field.options || [])];
    const optionNumber = newOptions.length + 1;
    newOptions.push({
      label: '',
      value: `option-${optionNumber}`,
    });
    onFieldUpdate({
      ...field,
      options: newOptions,
    });
  };

  const handleUpdateOption = (index: number, label: string) => {
    const newOptions = [...(field.options || [])];
    newOptions[index] = {
      ...newOptions[index],
      label,
      value: label.toLowerCase().replace(/\s+/g, '-'),
    };
    onFieldUpdate({
      ...field,
      options: newOptions,
    });
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...(field.options || [])];
    newOptions.splice(index, 1);
    onFieldUpdate({
      ...field,
      options: newOptions,
    });
  };

  return (
    <>
      <SettingsSection title="Options">
        <div className="space-y-4">
          {(field.options || []).map((option, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={option.label}
                onChange={(e) => handleUpdateOption(index, e.target.value)}
                placeholder="Enter option name"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveOption(index)}
                className="shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={handleAddOption}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Option
          </Button>
        </div>
      </SettingsSection>

      <SettingsSection title="Dropdown behavior">
        <div className="space-y-4">
          <Toggle
            label="Clearable"
            description="Allow users to clear their selection"
            checked={field.settings?.clearable !== false}
            onCheckedChange={(checked) =>
              onFieldUpdate({
                ...field,
                settings: {
                  ...field.settings,
                  clearable: checked,
                },
              })
            }
          />

          <Toggle
            label="Searchable"
            description="Enable search functionality for options"
            checked={field.settings?.searchable || false}
            onCheckedChange={(checked) =>
              onFieldUpdate({
                ...field,
                settings: {
                  ...field.settings,
                  searchable: checked,
                },
              })
            }
          />
        </div>
      </SettingsSection>
    </>
  );
}