'use client';

import { ConditionOperator } from '@/types/conditions';

export function getAvailableOperators(fieldType: string): { value: ConditionOperator; label: string }[] {
  const baseOperators: { value: ConditionOperator; label: string }[] = [
    { value: 'equals' as ConditionOperator, label: 'equals' },
    { value: 'not_equals' as ConditionOperator, label: 'does not equal' }
  ];

  switch (fieldType) {
    case 'text':
    case 'textarea':
    case 'email':
    case 'url':
    case 'phone':
      return [
        ...baseOperators,
        { value: 'contains', label: 'contains' },
        { value: 'not_contains', label: 'does not contain' }
      ];

    case 'number':
    case 'number-rating':
    case 'star-rating':
      return [
        ...baseOperators,
        { value: 'greater_than', label: 'is greater than' },
        { value: 'less_than', label: 'is less than' }
      ];

    default:
      return baseOperators;
  }
}