'use client';

import { FormField } from '@/types/form';
import { format } from 'date-fns';

export function formatFieldValue(field: FormField, value: any): string {
  if (value === undefined || value === null || value === '') {
    return '';
  }

  switch (field.type) {
    case 'date':
      try {
        return format(new Date(value), 'PPP');
      } catch {
        return String(value);
      }
    
    case 'file':
    case 'multi-select':
      if (Array.isArray(value)) {
        return value.join(', ');
      }
      return String(value);
    
    case 'checkbox':
      return value ? 'Yes' : 'No';
    
    case 'star-rating':
      return `${value} star${value === 1 ? '' : 's'}`;
    
    case 'number-rating':
      return String(value);
    
    default:
      return String(value);
  }
}