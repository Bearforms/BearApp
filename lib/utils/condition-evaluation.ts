'use client';

import { FormField } from '@/types/form';
import { FieldCondition } from '@/types/conditions';

export function evaluateCondition(
  condition: FieldCondition,
  formData: Record<string, any> = {},
  fields: FormField[] = []
): boolean {
  // Validate inputs
  if (!condition?.fieldId || !condition?.operator || !fields?.length) {
    return false;
  }

  const field = fields.find(f => f.id === condition.fieldId);
  if (!field) return false;

  const fieldValue = formData[condition.fieldId];
  
  // Handle empty/undefined values
  if (fieldValue === undefined || fieldValue === null) {
    return false;
  }

  switch (condition.operator) {
    case 'equals':
      return String(fieldValue) === String(condition.value);
    case 'not_equals':
      return String(fieldValue) !== String(condition.value);
    case 'contains':
      return String(fieldValue).toLowerCase().includes(String(condition.value).toLowerCase());
    case 'not_contains':
      return !String(fieldValue).toLowerCase().includes(String(condition.value).toLowerCase());
    case 'greater_than':
      return !isNaN(Number(fieldValue)) && !isNaN(Number(condition.value)) && 
             Number(fieldValue) > Number(condition.value);
    case 'less_than':
      return !isNaN(Number(fieldValue)) && !isNaN(Number(condition.value)) && 
             Number(fieldValue) < Number(condition.value);
    default:
      return false;
  }
}

export function shouldShowField(
  field: FormField,
  formData: Record<string, any> = {},
  fields: FormField[] = []
): boolean {
  // If no conditions, field should be visible
  if (!field?.settings?.conditions?.length) {
    return true;
  }

  const conditions = field.settings.conditions;
  const visibilityAction = field.settings.visibilityAction || 'hide';
  const conditionLogic = field.settings.conditionLogic || 'and';

  const conditionsMet = conditionLogic === 'and'
    ? conditions.every(c => evaluateCondition(c, formData, fields))
    : conditions.some(c => evaluateCondition(c, formData, fields));

  return visibilityAction === 'hide' ? !conditionsMet : conditionsMet;
}