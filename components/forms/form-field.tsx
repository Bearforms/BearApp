'use client';

import { FormField as IFormField, ThemeSettings } from '@/types/form';
import { useFormTheme } from '@/hooks/use-form-theme';
import { cn } from '@/lib/utils';
import { TextField } from './fields/text-field';
import { TextareaField } from './fields/textarea-field';
import { EmailField } from './fields/email-field';
import { PhoneField } from './fields/phone-field';
import { DateField } from './fields/date-field';
import { TimeField } from './fields/time-field';
import { FileUploadField } from './fields/file-upload';
import { StarRatingField } from './fields/star-rating';
import { NumberRatingField } from './fields/number-rating';
import { SelectField } from './fields/select-field';
import { HeadingField } from './fields/heading-field';
import { ParagraphField } from './fields/paragraph-field';
import { RichTextField } from './fields/rich-text/rich-text-field';
import { DropdownField } from './fields/dropdown-field';
import { URLField } from './fields/url-field';
import { PageBreak } from './fields/page-break';
import { CheckboxField } from './fields/checkbox-field';

const components: { [key: string]: React.ComponentType<any> } = {
  text: TextField,
  textarea: TextareaField,
  email: EmailField,
  phone: PhoneField,
  date: DateField,
  time: TimeField,
  file: FileUploadField,
  'star-rating': StarRatingField,
  'number-rating': NumberRatingField,
  select: SelectField,
  'multi-select': SelectField,
  heading: HeadingField,
  paragraph: ParagraphField,
  'rich-text': RichTextField,
  dropdown: DropdownField,
  url: URLField,
  'page-break': PageBreak,
  checkbox: CheckboxField,
};

interface FormFieldProps {
  field: IFormField;
  themeSettings?: ThemeSettings;
  onFieldChange?: (field: Partial<IFormField>) => void;
  showLabel?: boolean;
  showHelperText?: boolean;
  preview?: boolean;
  value?: any;
  onChange?: (value: any) => void;
  className?: string;
  error?: string;
}

export function FormField({
  field,
  themeSettings,
  onFieldChange,
  showLabel = true,
  showHelperText = true,
  preview = false,
  value,
  onChange,
  className,
  error,
}: FormFieldProps) {
  if (!field) return null;

  const Component = components[field.type];
  if (!Component) return null;

  return (
    <div
      className={cn(
        'form-field',
        field.settings?.width === 'half' ? 'w-1/2' : 'w-full',
        className
      )}
    >
      <Component
        field={field}
        onFieldChange={onFieldChange}
        showLabel={showLabel}
        showHelperText={showHelperText}
        preview={preview}
        value={value}
        onChange={onChange}
        error={error}
      />
    </div>
  );
}