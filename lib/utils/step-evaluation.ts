'use client';

import { FormField } from '@/types/form';
import { StepCondition } from '@/types/step-conditions';
import { evaluateCondition } from './condition-evaluation';

export function shouldShowStep(
  field: FormField,
  formData: Record<string, any> = {},
  fields: FormField[] = []
): boolean {
  // If no step conditions, step should be visible
  if (!field?.settings?.stepConditions?.length) {
    return true;
  }

  const conditions = field.settings.stepConditions;
  const visibilityAction = field.settings.stepVisibilityAction || 'hide';
  const conditionLogic = field.settings.stepConditionLogic || 'and';

  const conditionsMet = conditionLogic === 'and'
    ? conditions.every(c => evaluateCondition(c, formData, fields))
    : conditions.some(c => evaluateCondition(c, formData, fields));

  return visibilityAction === 'hide' ? !conditionsMet : conditionsMet;
}

export function getVisibleSteps(
  fields: FormField[],
  formData: Record<string, any>
): number[] {
  const steps: number[] = [0]; // Always include first step
  let currentStep = 1;

  fields.forEach((field) => {
    if (field.type === 'page-break') {
      if (shouldShowStep(field, formData, fields)) {
        steps.push(currentStep);
      }
      currentStep++;
    }
  });

  return steps;
}

export function getNextVisibleStep(
  currentStep: number,
  fields: FormField[],
  formData: Record<string, any>
): number | undefined {
  const visibleSteps = getVisibleSteps(fields, formData);
  return visibleSteps.find(step => step > currentStep);
}

export function getPreviousVisibleStep(
  currentStep: number,
  fields: FormField[],
  formData: Record<string, any>
): number | undefined {
  const visibleSteps = getVisibleSteps(fields, formData);
  return [...visibleSteps].reverse().find(step => step < currentStep);
}