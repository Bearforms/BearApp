'use client';

export type ConditionOperator = 
  | 'equals' 
  | 'not_equals' 
  | 'contains' 
  | 'not_contains'
  | 'greater_than' 
  | 'less_than';

export interface FieldCondition {
  id: string;
  fieldId: string;
  operator: ConditionOperator;
  value: string;
}

export interface ConditionSettings {
  conditions?: FieldCondition[];
  visibilityAction?: 'show' | 'hide';
  conditionLogic?: 'and' | 'or';
}