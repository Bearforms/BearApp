'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { FormBuilder } from '@/components/forms/form-builder';
import { FormBuilderHeader } from '@/components/forms/form-builder-header';
import { FormPreview } from '@/components/forms/preview/form-preview';
import { FormField } from '@/types/form';

export default function NewFormPage() {
  const [isThemeSettingsOpen, setIsThemeSettingsOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [fields, setFields] = useState<FormField[]>([]);
  const [themeSettings, setThemeSettings] = useState({
    coverType: 'none' as const,
    showLogo: true,
    coverColor: '#f3f4f6',
    coverImage: '',
    logo: '',
  });

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <FormBuilderHeader
          onThemeSettingsOpen={() => setIsThemeSettingsOpen(true)}
          onPreviewOpen={() => setIsPreviewOpen(true)}
          onShareOpen={() => setIsShareOpen(true)}
          onSettingsOpen={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
        <div className="flex-1 overflow-y-auto">
          <FormBuilder
            isThemeSettingsOpen={isThemeSettingsOpen}
            onThemeSettingsOpenChange={setIsThemeSettingsOpen}
            title={formTitle}
            onTitleChange={setFormTitle}
            description={formDescription}
            onDescriptionChange={setFormDescription}
            isPreviewOpen={isPreviewOpen}
            onPreviewOpenChange={setIsPreviewOpen}
            isShareOpen={isShareOpen}
            onShareOpenChange={setIsShareOpen}
            fields={fields}
            onFieldsChange={setFields}
            themeSettings={themeSettings}
            onThemeSettingsChange={setThemeSettings}
          />

          <FormPreview
            open={isPreviewOpen}
            onOpenChange={setIsPreviewOpen}
            title={formTitle}
            description={formDescription}
            fields={fields}
            name="New Form"
            formId="new"
            themeSettings={themeSettings}
          />
        </div>
      </main>
    </div>
  );
}
