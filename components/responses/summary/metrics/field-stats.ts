'use client';

import { FormField } from '@/types/form';

interface FieldStats {
  totalResponses: number;
  filledResponses: number;
  emptyResponses: number;
  completionRate: number;
  emptyRate: number;
}

export function getFieldCompletionStats(field: FormField, responses: any[]): FieldStats {
  const totalResponses = responses.length;
  let filledResponses = 0;

  responses.forEach(response => {
    const value = response.data[field.label];
    
    // Check if response is filled based on field type
    const isFilled = isResponseFilled(field, value);
    if (isFilled) {
      filledResponses++;
    }
  });

  const emptyResponses = totalResponses - filledResponses;
  const completionRate = totalResponses > 0 ? (filledResponses / totalResponses) * 100 : 0;
  const emptyRate = totalResponses > 0 ? (emptyResponses / totalResponses) * 100 : 0;

  return {
    totalResponses,
    filledResponses,
    emptyResponses,
    completionRate,
    emptyRate
  };
}

function isResponseFilled(field: FormField, value: any): boolean {
  if (value === undefined || value === null) return false;

  switch (field.type) {
    case 'text':
    case 'textarea':
    case 'email':
    case 'phone':
    case 'url':
      return value.trim() !== '';
      
    case 'select':
    case 'dropdown':
      return value !== '';
      
    case 'multi-select':
      return Array.isArray(value) && value.length > 0;
      
    case 'checkbox':
      return typeof value === 'boolean';
      
    case 'date':
    case 'time':
      return Boolean(value);
      
    case 'file':
      return Array.isArray(value) ? value.length > 0 : Boolean(value);
      
    case 'star-rating':
    case 'number-rating':
      return typeof value === 'number' && !isNaN(value);
      
    default:
      return false;
  }
}