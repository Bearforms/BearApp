'use client';

import { FormField } from '@/types/form';
import { SettingsSection } from '../settings-section';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ConditionLogicProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
}

export function ConditionLogic({ field, onFieldUpdate }: ConditionLogicProps) {
  return (
    <SettingsSection 
      title="Condition Logic" 
      description="Choose how multiple conditions should be evaluated"
    >
      <Select
        value={field.settings?.conditionLogic || 'and'}
        onValueChange={(value: 'and' | 'or') => {
          onFieldUpdate({
            ...field,
            settings: {
              ...field.settings,
              conditionLogic: value
            }
          });
        }}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="and">Match ALL conditions (AND)</SelectItem>
          <SelectItem value="or">Match ANY condition (OR)</SelectItem>
        </SelectContent>
      </Select>
    </SettingsSection>
  );
}