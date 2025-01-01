'use client';

import { useParams } from 'next/navigation';
import { useFormStore } from '@/stores/form-store';
import { FormPageLayout } from '@/components/forms/layout/form-page-layout';
import { FormBuilder } from '@/components/forms/form-builder';
import { useEffect, useState } from 'react';
import { FormField, ThemeSettings, ThankYouSettings } from '@/types/form';
import { ButtonSettings } from '@/types/button';

export default function EditFormPage() {
  const params = useParams();
  const formId = params.id as string;
  const form = useFormStore((state) =>
    state.forms.find((f) => f.id === formId)
  );
  const updateForm = useFormStore((state) => state.updateForm);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fields, setFields] = useState<FormField[]>([]);
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>();
  const [buttonSettings, setButtonSettings] = useState<ButtonSettings>();
  const [thankYouSettings, setThankYouSettings] = useState<ThankYouSettings>();

  // Load form data when component mounts or form changes
  useEffect(() => {
    if (form) {
      setTitle(form.title || '');
      setDescription(form.description || '');
      setFields(form.fields || []);
      setThemeSettings(form.themeSettings);
      setButtonSettings(form.buttonSettings);
      setThankYouSettings(form.thankYouSettings);
    }
  }, [form]);

  // Update form when data changes
  const handleUpdate = async (updates: any) => {
    if (form) {
      await updateForm(form.id, updates);
    }
  };

  if (!form) return null;

  return (
    <FormPageLayout formId={formId}>
      <FormBuilder
        title={title}
        onTitleChange={(value) => {
          setTitle(value);
          handleUpdate({ title: value });
        }}
        description={description}
        onDescriptionChange={(value) => {
          setDescription(value);
          handleUpdate({ description: value });
        }}
        fields={fields}
        onFieldsChange={(value) => {
          setFields(value);
          handleUpdate({ fields: value });
        }}
        themeSettings={themeSettings}
        onThemeSettingsChange={(value) => {
          setThemeSettings(value);
          handleUpdate({ themeSettings: value });
        }}
        buttonSettings={buttonSettings}
        onButtonSettingsChange={(value) => {
          setButtonSettings(value);
          handleUpdate({ buttonSettings: value });
        }}
        thankYouSettings={thankYouSettings}
        onThankYouSettingsChange={(value) => {
          setThankYouSettings(value);
          handleUpdate({ thankYouSettings: value });
        }}
        isThemeSettingsOpen={false}
        onThemeSettingsOpenChange={() => {}}
        isPreviewOpen={false}
        onPreviewOpenChange={() => {}}
        isShareOpen={false}
        onShareOpenChange={() => {}}
      />
    </FormPageLayout>
  );
}
