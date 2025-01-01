'use client';

import { FormField } from '@/types/form';
import { FormFieldList } from './form-field-list';
import { FormSubmitButton } from '../form-submit-button';
import { ButtonSettings } from '@/types/button';
import { ThankYouSeparator } from '../thank-you-separator';
import { ThankYouPreview } from '../preview/thank-you-preview';
import { ThankYouSettings, ThemeSettings } from '@/types/form';
import { AddFieldButton } from '../fields/add-field-button';
import { nanoid } from 'nanoid';

interface FormContentProps {
  fields: FormField[];
  onFieldsChange: (fields: FormField[]) => void;
  selectedFieldId?: string;
  onFieldSelect: (field: FormField) => void;
  buttonSettings?: ButtonSettings;
  onButtonSettingsChange?: (settings: ButtonSettings) => void;
  onButtonSettingsOpen: () => void;
  themeSettings?: ThemeSettings;
  thankYouSettings?: ThankYouSettings;
  onThankYouSettingsOpen: () => void;
}

export function FormContent({
  fields,
  onFieldsChange,
  selectedFieldId,
  onFieldSelect,
  buttonSettings,
  onButtonSettingsChange,
  onButtonSettingsOpen,
  themeSettings,
  thankYouSettings,
  onThankYouSettingsOpen,
}: FormContentProps) {
  const handleAddField = (type: string, afterFieldId?: string) => {
    const newField: FormField = {
      id: nanoid(),
      type,
      label:
        type === 'heading'
          ? 'Heading'
          : type === 'paragraph'
          ? 'Paragraph'
          : `New ${type} field`,
      placeholder:
        type === 'heading'
          ? 'Enter heading'
          : type === 'dropdown'
          ? 'Select option'
          : type === 'paragraph'
          ? 'Enter text'
          : `Enter ${type}`,
      validation: { required: false },
      settings: {
        headingLevel: type === 'heading' ? 2 : undefined,
        visible: true,
      },
    };

    if (afterFieldId) {
      const index = fields.findIndex((f) => f.id === afterFieldId);
      if (index !== -1) {
        const newFields = [...fields];
        newFields.splice(index + 1, 0, newField);
        onFieldsChange(newFields);
        return;
      }
    }

    onFieldsChange([...fields, newField]);
  };

  return (
    <div className="space-y-[var(--theme-spacing)] pb-10">
      <FormFieldList
        fields={fields}
        onFieldsChange={onFieldsChange}
        selectedFieldId={selectedFieldId}
        onFieldSelect={onFieldSelect}
        onAddField={handleAddField}
        themeSettings={themeSettings}
      />
      
      <div className="px-3">
        <AddFieldButton onAddField={handleAddField} />
      </div>

      <FormSubmitButton
        settings={buttonSettings}
        onSettingsChange={onButtonSettingsChange}
        onEdit={onButtonSettingsOpen}
        themeSettings={themeSettings}
      />

      <ThankYouSeparator />

      <div className="mb-16">
        <ThankYouPreview
          settings={thankYouSettings || {} as ThankYouSettings} 
          onEdit={onThankYouSettingsOpen}
          themeSettings={themeSettings}
        />
      </div>
    </div>
  );
}