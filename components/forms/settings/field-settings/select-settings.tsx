'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import { FormField } from '@/types/form';
import { SettingsSection } from './settings-section';
import { Toggle } from './toggle';

interface SelectSettingsProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
}

export function SelectSettings({ field, onFieldUpdate }: SelectSettingsProps) {
  if (field.type !== 'select' && field.type !== 'multi-select') return null;

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

      {field.type === 'multi-select' && (
        <SettingsSection title="Selection limits">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-normal">Minimum selections</Label>
              <Input
                type="number"
                min="0"
                value={field.validation?.min || ''}
                onChange={(e) =>
                  onFieldUpdate({
                    ...field,
                    validation: {
                      ...field.validation,
                      min: e.target.value ? Number(e.target.value) : undefined,
                    },
                  })
                }
                placeholder="No minimum"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-normal">Maximum selections</Label>
              <Input
                type="number"
                min="0"
                value={field.validation?.max || ''}
                onChange={(e) =>
                  onFieldUpdate({
                    ...field,
                    validation: {
                      ...field.validation,
                      max: e.target.value ? Number(e.target.value) : undefined,
                    },
                  })
                }
                placeholder="No maximum"
              />
            </div>
          </div>
        </SettingsSection>
      )}
    </>
  );
}