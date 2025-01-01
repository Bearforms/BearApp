'use client';

export interface StepCondition {
  id: string;
  fieldId: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than';
  value: string;
}

export interface StepConditionSettings {
  stepConditions?: StepCondition[];
  stepVisibilityAction?: 'show' | 'hide';
  stepConditionLogic?: 'and' | 'or';
}