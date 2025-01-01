'use client';

import { FormField } from '@/types/form';
import { ConditionOperator } from '@/types/conditions';

export function getAvailableOperators(fieldType: string): { value: ConditionOperator; label: string }[] {
  const baseOperators = [
    { value: 'equals', label: 'equals' },
    { value: 'not_equals', label: 'does not equal' }
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

export function getFieldValues(field: FormField): { label: string; value: string }[] {
  if (!field) return [];

  switch (field.type) {
    case 'select':
    case 'multi-select':
    case 'dropdown':
      return field.options?.map(opt => ({
        label: opt.label,
        value: opt.value
      })) || [];

    case 'checkbox':
      return [
        { label: 'Checked', value: 'true' },
        { label: 'Unchecked', value: 'false' }
      ];

    case 'star-rating':
      const maxStars = field.settings?.maxStars || 5;
      return Array.from({ length: maxStars }, (_, i) => ({
        label: `${i + 1} stars`,
        value: String(i + 1)
      }));

    case 'number-rating':
      const maxRating = field.settings?.maxRating || 10;
      return Array.from({ length: maxRating }, (_, i) => ({
        label: String(i + 1),
        value: String(i + 1)
      }));

    case 'text':
    case 'textarea':
    case 'email':
    case 'url':
    case 'phone':
      return [
        { label: 'Is empty', value: 'empty' },
        { label: 'Is not empty', value: 'not_empty' }
      ];

    case 'date':
      return [
        { label: 'Today', value: 'today' },
        { label: 'Yesterday', value: 'yesterday' },
        { label: 'Tomorrow', value: 'tomorrow' },
        { label: 'Last 7 days', value: 'last7days' },
        { label: 'Next 7 days', value: 'next7days' }
      ];

    case 'time':
      return [
        { label: 'Morning (before 12 PM)', value: 'morning' },
        { label: 'Afternoon (12 PM - 5 PM)', value: 'afternoon' },
        { label: 'Evening (after 5 PM)', value: 'evening' }
      ];

    case 'file':
      return [
        { label: 'Has file', value: 'has_file' },
        { label: 'No file', value: 'no_file' }
      ];

    default:
      return [];
  }
}