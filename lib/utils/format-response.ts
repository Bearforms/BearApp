'use client';

import { FormField } from '@/types/form';
import { format } from 'date-fns';

export function formatResponseValue(field: FormField, value: any): string {
  if (value === undefined || value === null || value === '') {
    return '-';
  }

  switch (field.type) {
    case 'date':
      try {
        return format(new Date(value), 'PPP');
      } catch {
        return String(value);
      }
    
    case 'file':
      if (Array.isArray(value)) {
        return value.map(file => file.name || file).join(', ');
      }
      return value.name || String(value);
    
    case 'multi-select':
      if (Array.isArray(value)) {
        return value.join(', ');
      }
      return String(value);
    
    case 'checkbox':
      return value ? 'Yes' : 'No';
    
    case 'star-rating':
      return `${value} ★`;
    
    case 'number-rating':
      return String(value);
    
    case 'select':
    case 'dropdown':
      const option = field.options?.find(opt => opt.value === value);
      return option?.label || String(value);
    
    default:
      return String(value);
  }
}