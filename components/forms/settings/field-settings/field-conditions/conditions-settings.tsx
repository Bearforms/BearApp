// components/forms/settings/field-settings/conditions-settings.tsx
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
import { useFieldCondition } from './field-conditions/use-field-condition';
import {
  getAvailableOperators,
  getFieldValues,
} from '@/lib/utils/condition-validation';

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
      operator: '',
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

        // Get the updated condition
        const updatedCondition = { ...condition, ...updates };

        // If the field changed, reset operator and value
        if (updates.fieldId && updates.fieldId !== condition.fieldId) {
          updatedCondition.operator = '';
          updatedCondition.value = '';
        }

        // If the operator changed, reset value
        if (updates.operator && updates.operator !== condition.operator) {
          updatedCondition.value = '';
        }

        return updatedCondition;
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

            {conditions.map((condition) => {
              const selectedField = availableFields.find(
                (f) => f.id === condition.fieldId
              );
              const operators = selectedField
                ? getAvailableOperators(selectedField.type)
                : [];
              const values = selectedField ? getFieldValues(selectedField) : [];

              return (
                <div
                  key={condition.id}
                  className="space-y-2 p-2 bg-neutral-50 rounded-md border-[0.5px] border-neutral-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">When</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveCondition(condition.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-transparent px-0 h-auto font-normal"
                    >
                      Delete
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {/* Field Selection */}
                    <Select
                      value={condition.fieldId}
                      onValueChange={(value) =>
                        handleUpdateCondition(condition.id, { fieldId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableFields.map((f) => (
                          <SelectItem key={f.id} value={f.id}>
                            {f.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Operator Selection */}
                    {selectedField && (
                      <Select
                        value={condition.operator}
                        onValueChange={(value) =>
                          handleUpdateCondition(condition.id, {
                            operator: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select operator" />
                        </SelectTrigger>
                        <SelectContent>
                          {operators.map((op) => (
                            <SelectItem key={op.value} value={op.value}>
                              {op.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {/* Value Selection */}
                    {selectedField && condition.operator && (
                      <Select
                        value={condition.value}
                        onValueChange={(value) =>
                          handleUpdateCondition(condition.id, { value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select value" />
                        </SelectTrigger>
                        <SelectContent>
                          {values.map((val) => (
                            <SelectItem key={val.value} value={val.value}>
                              {val.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
              );
            })}

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
                  <p className="text-sm text-muted-foreground leading-relaxed">
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
