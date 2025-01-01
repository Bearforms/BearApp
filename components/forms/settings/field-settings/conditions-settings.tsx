'use client';

import { FormField } from '@/types/form';
import {  ConditionOperator } from '@/types/conditions';
import { SettingsSection } from './settings-section';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ConditionRow } from './field-conditions/condition-row';

interface ConditionsSettingsProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
  fields: FormField[];
}

export function ConditionsSettings({
  field,
  onFieldUpdate,
  fields,
}: ConditionsSettingsProps) {
  // Filter out current field and non-input fields
  const availableFields = fields.filter(
    (f) =>
      f.id !== field.id &&
      !['heading', 'paragraph', 'page-break'].includes(f.type)
  );

  const conditions = field.settings?.conditions || [];
  const hasConditions = conditions.length > 0;
  const visibilityAction = field.settings?.visibilityAction || 'hide';

  const handleAddCondition = () => {
    const newCondition = {
      id: Math.random().toString(36).slice(2),
      fieldId: '',
      operator: 'equals' as ConditionOperator,
      value: '',
    };

    onFieldUpdate({
      ...field,
      settings: {
        ...field.settings,
        conditions: [...(field.settings?.conditions || []), newCondition],
      },
    });
  };

  const handleUpdateCondition = (conditionId: string, updates: any) => {
    const updatedConditions =
      field.settings?.conditions?.map((condition) => {
        if (condition.id !== conditionId) return condition;
        return { ...condition, ...updates };
      }) || [];

    onFieldUpdate({
      ...field,
      settings: {
        ...field.settings,
        conditions: updatedConditions,
      },
    });
  };

  const handleRemoveCondition = (conditionId: string) => {
    onFieldUpdate({
      ...field,
      settings: {
        ...field.settings,
        conditions:
          field.settings?.conditions?.filter((c) => c.id !== conditionId) || [],
      },
    });
  };

  return (
    <SettingsSection>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="text-sm font-medium">Field conditions</h4>
            <p className="text-sm text-muted-foreground">
              Show or hide this field based on other field values
            </p>
          </div>
          <Switch
            checked={hasConditions}
            onCheckedChange={(checked) => {
              if (!checked) {
                onFieldUpdate({
                  ...field,
                  settings: {
                    ...field.settings,
                    conditions: [],
                  },
                });
              } else {
                handleAddCondition();
              }
            }}
          />
        </div>

        {hasConditions && (
          <div className="space-y-4">
            <Select
              value={visibilityAction}
              onValueChange={(value: 'show' | 'hide') => {
                onFieldUpdate({
                  ...field,
                  settings: {
                    ...field.settings,
                    visibilityAction: value,
                  },
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hide">Hide this field</SelectItem>
                <SelectItem value="show">Show this field</SelectItem>
              </SelectContent>
            </Select>

            {conditions.map((condition) => (
              <ConditionRow
                key={condition.id}
                condition={condition}
                availableFields={availableFields}
                onUpdate={handleUpdateCondition}
                onRemove={handleRemoveCondition}
              />
            ))}

            <Button
              variant="outline"
              className="w-full"
              onClick={handleAddCondition}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add condition
            </Button>

            {conditions.length > 1 && (
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Choose how multiple conditions should be evaluated
                  </p>
                </div>
                <Select
                  value={field.settings?.conditionLogic || 'and'}
                  onValueChange={(value: 'and' | 'or') => {
                    onFieldUpdate({
                      ...field,
                      settings: {
                        ...field.settings,
                        conditionLogic: value,
                      },
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="and">
                      Match ALL conditions (AND)
                    </SelectItem>
                    <SelectItem value="or">Match ANY condition (OR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}
      </div>
    </SettingsSection>
  );
}
