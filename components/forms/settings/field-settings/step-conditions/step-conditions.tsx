'use client';

import { FormField } from '@/types/form';
import { SettingsSection } from '../settings-section';
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
import { StepConditionRow } from './step-condition-row';
import { useMemo } from 'react';
import { StepCondition } from '@/types/step-conditions';

interface StepConditionsProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
  fields?: FormField[];
}

export function StepConditions({
  field,
  onFieldUpdate,
  fields = [],
}: StepConditionsProps) {
  const availableFields = useMemo(
    () =>
      fields.filter(
        (f) =>
          f.id !== field.id &&
          !['heading', 'paragraph', 'page-break'].includes(f.type)
      ),
    [fields, field.id]
  );

  const conditions = field.settings?.stepConditions || [];
  const hasConditions = conditions.length > 0;

  const handleToggleConditions = (checked: boolean) => {
    if (!checked) {
      // Remove all conditions
      onFieldUpdate({
        ...field,
        settings: {
          ...field.settings,
          stepConditions: [],
          stepVisibilityAction: undefined,
          stepConditionLogic: undefined,
        },
      });
    } else {
      // Initialize with first condition
      const initialCondition: StepCondition = {
        id: Math.random().toString(36).slice(2),
        fieldId: '',
        operator: 'equals',
        value: '',
      };

      onFieldUpdate({
        ...field,
        settings: {
          ...field.settings,
          stepConditions: [initialCondition],
          stepVisibilityAction: 'hide',
          stepConditionLogic: 'and',
        },
      });
    }
  };

  const handleAddCondition = () => {
    const newCondition: StepCondition = {
      id: Math.random().toString(36).slice(2),
      fieldId: '',
      operator: 'equals',
      value: '',
    };

    onFieldUpdate({
      ...field,
      settings: {
        ...field.settings,
        stepConditions: [...conditions, newCondition],
      },
    });
  };

  const handleUpdateCondition = (
    conditionId: string,
    updates: Partial<StepCondition>
  ) => {
    onFieldUpdate({
      ...field,
      settings: {
        ...field.settings,
        stepConditions: conditions.map((condition) =>
          condition.id === conditionId
            ? { ...condition, ...updates }
            : condition
        ),
      },
    });
  };

  const handleRemoveCondition = (conditionId: string) => {
    onFieldUpdate({
      ...field,
      settings: {
        ...field.settings,
        stepConditions: conditions.filter((c) => c.id !== conditionId),
      },
    });
  };

  return (
    <SettingsSection>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="text-sm font-medium">Step conditions</h4>
            <p className="text-sm text-muted-foreground">
              Show or hide this step based on field values
            </p>
          </div>
          <Switch
            checked={hasConditions}
            onCheckedChange={handleToggleConditions}
          />
        </div>

        {hasConditions && (
          <div className="space-y-4 pt-4">
            <Select
              value={field.settings?.stepVisibilityAction || 'hide'}
              onValueChange={(value: 'show' | 'hide') => {
                onFieldUpdate({
                  ...field,
                  settings: {
                    ...field.settings,
                    stepVisibilityAction: value,
                  },
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hide">Hide this step</SelectItem>
                <SelectItem value="show">Show this step</SelectItem>
              </SelectContent>
            </Select>

            {conditions.map((condition) => (
              <StepConditionRow
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
                  value={field.settings?.stepConditionLogic || 'and'}
                  onValueChange={(value: 'and' | 'or') => {
                    onFieldUpdate({
                      ...field,
                      settings: {
                        ...field.settings,
                        stepConditionLogic: value,
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
