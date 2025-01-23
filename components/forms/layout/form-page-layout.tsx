'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { FormHeader } from '@/components/forms/navigation/form-header';
import { ThemeSettings } from '@/components/forms/settings/theme-settings';
import { ShareSettings } from '@/components/forms/settings/share-settings';
import { GeneralSettings } from '@/components/forms/settings/general-settings';
import { FormPreview } from '@/components/forms/preview/form-preview';
import { useFormStore } from '@/stores/form-store';

interface FormPageLayoutProps {
  formId: string;
  children: React.ReactNode;
}

export function FormPageLayout({ formId, children }: FormPageLayoutProps) {
  const [isThemeSettingsOpen, setIsThemeSettingsOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const form = useFormStore((state) =>
    state.forms.find((f) => f.id === formId)
  );

  if (!form) return null;

  return (
    <main className="flex-1 flex flex-col min-w-0">
      <FormHeader
        title={form.name}
        onThemeSettingsOpen={() => setIsThemeSettingsOpen(true)}
        onPreviewOpen={() => setIsPreviewOpen(true)}
        onShareOpen={() => setIsShareOpen(true)}
        onSettingsOpen={() => setIsSettingsOpen(true)}
      />
      <div className="flex-1 overflow-hidden relative">
        {children}

        {isThemeSettingsOpen && (
          <div className="absolute top-5 bottom-5 right-5 w-[340px] rounded-md border-[0.5px] border-neutral-200 shadow-lg bg-white overflow-hidden">
            <ThemeSettings
              settings={form.themeSettings}
              onSettingsChange={(settings) => {
                useFormStore.getState().updateForm(formId, {
                  themeSettings: settings,
                });
              }}
              onClose={() => setIsThemeSettingsOpen(false)}
            />
          </div>
        )}

        {isShareOpen && (
          <div className="absolute top-5 bottom-5 right-5 w-[340px] rounded-md border-[0.5px] border-neutral-200 shadow-lg bg-white overflow-hidden">
            <ShareSettings
              formId={formId}
              onClose={() => setIsShareOpen(false)}
            />
          </div>
        )}

        {isSettingsOpen && (
          <div className="absolute top-5 bottom-5 right-5 w-[340px] rounded-md border-[0.5px] border-neutral-200 shadow-lg bg-white overflow-hidden">
            <GeneralSettings
              formId={formId}
              onClose={() => setIsSettingsOpen(false)}
            />
          </div>
        )}

        <FormPreview
          open={isPreviewOpen}
          onOpenChange={setIsPreviewOpen}
          title={form.title}
          description={form.description}
          fields={form.fields}
          name={form.name}
          formId={form.id}
          themeSettings={form.themeSettings}
          buttonSettings={form.buttonSettings}
          thankYouSettings={form.thankYouSettings}
        />
      </div>
    </main>
  );
}
