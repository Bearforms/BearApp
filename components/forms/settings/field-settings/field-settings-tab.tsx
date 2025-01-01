'use client';

import { FormField } from '@/types/form';
import { ValidationSettings } from './validation-settings';
import { DisplaySettings } from './display-settings';
import { SelectSettings } from './select-settings';
import { FileSettings } from './file-settings';
import { HeadingSettings } from './heading-settings';
import { RatingSettings } from './rating-settings';
import { ContentSettings } from './content-settings';
import { DropdownSettings } from './dropdown-settings';
import { CheckboxSettings } from './checkbox-settings';
import { PageBreakSettings } from './page-break-settings';

interface FieldSettingsTabProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
}

export function FieldSettingsTab({ field, onFieldUpdate }: FieldSettingsTabProps) {
  const isRatingField = field.type === 'star-rating' || field.type === 'number-rating';
  const isContentField = field.type === 'heading' || field.type === 'paragraph';
  const isPageBreak = field.type === 'page-break';

  return (
    <div className="space-y-8">
      {!isContentField && !isPageBreak && (
        <DisplaySettings field={field} onFieldUpdate={onFieldUpdate} />
      )}

      {field.type === 'checkbox' && (
        <CheckboxSettings field={field} onFieldUpdate={onFieldUpdate} />
      )}

      {!isContentField && !isPageBreak && !isRatingField && (
        <ValidationSettings field={field} onFieldUpdate={onFieldUpdate} />
      )}

      {isContentField && (
        <ContentSettings field={field} onFieldUpdate={onFieldUpdate} />
      )}

      {field.type === 'heading' && (
        <HeadingSettings field={field} onFieldUpdate={onFieldUpdate} />
      )}

      {(field.type === 'select' || field.type === 'multi-select') && (
        <SelectSettings field={field} onFieldUpdate={onFieldUpdate} />
      )}

      {field.type === 'dropdown' && (
        <DropdownSettings field={field} onFieldUpdate={onFieldUpdate} />
      )}

      {field.type === 'file' && (
        <FileSettings field={field} onFieldUpdate={onFieldUpdate} />
      )}

      {isRatingField && (
        <RatingSettings field={field} onFieldUpdate={onFieldUpdate} />
      )}

      {isPageBreak && (
        <PageBreakSettings fields={[]} field={field} onFieldUpdate={onFieldUpdate} />
      )}
    </div>
  );
}