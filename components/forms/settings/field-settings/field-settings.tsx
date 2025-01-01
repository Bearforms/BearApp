'use client';

import { FormField } from '@/types/form';
import { SettingsHeader } from './header';
import { FieldSettings } from './field-settings-content';
import { ConditionsSettings } from './field-conditions/conditions-settings';
import { toast } from '@/hooks/use-toast';
import { useHotkeys } from '@/hooks/use-hotkeys';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { isContentField, isPageBreak } from './utils';

interface FormFieldSettingsProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
  onDismiss: () => void;
  fields: FormField[];
}

export function FormFieldSettings({
  field,
  onFieldUpdate,
  onDismiss,
  fields,
}: FormFieldSettingsProps) {
  const [originalField] = useState<FormField>(field);

  const handleReset = () => {
    onFieldUpdate(originalField);
    toast({
      description: 'Settings reset to original values',
    });
  };

  useHotkeys('esc', onDismiss);
  useHotkeys('mod+z', handleReset);

  if (!field || !field.type) return null;

  return (
    <div className="h-full flex flex-col bg-white">
      <SettingsHeader
        onDismiss={onDismiss}
        onReset={handleReset}
        fieldType={field.type}
      />
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-8">
          <FieldSettings 
            field={field} 
            onFieldUpdate={onFieldUpdate} 
            fields={fields}
          />
          
          {!isContentField(field) && !isPageBreak(field) && (
            <>
              <Separator />
              <ConditionsSettings 
                field={field} 
                onFieldUpdate={onFieldUpdate} 
                fields={fields} 
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}