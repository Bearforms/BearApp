'use client';

import { FormField } from '@/types/form';

export function isContentField(field: FormField): boolean {
  return field.type === 'heading' || field.type === 'paragraph';
}

export function isPageBreak(field: FormField): boolean {
  return field.type === 'page-break';
}

export function isRatingField(field: FormField): boolean {
  return field.type === 'star-rating' || field.type === 'number-rating';
}

export function getAvailableFields(fields: FormField[], currentFieldId: string): FormField[] {
  return fields.filter(f => 
    f.id !== currentFieldId && 
    !['heading', 'paragraph', 'page-break'].includes(f.type)
  );
}