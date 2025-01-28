'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { FormHeader } from '@/components/forms/navigation/form-header';
import { ThemeSettings } from '@/components/forms/settings/theme-settings';
import { ShareSettings } from '@/components/forms/settings/share-settings';
import { GeneralSettings } from '@/components/forms/settings/general-settings';
import { FormPreview } from '@/components/forms/preview/form-preview';
import { useFormStore } from '@/stores/form-store';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FormPageLayoutProps {
  formId: string;
  children: React.ReactNode;
}

export function FormPageLayout({ formId, children }: FormPageLayoutProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [openAction, setOpenAction] = useState<"themeSettings" | "share" | "settings" | null>(null);

  const handleOpenAction = (action: "themeSettings" | "share" | "settings" | null) => {
    setOpenAction(action);
  };

  const form = useFormStore((state) => state.form);

  if (!form) return null;

  return (
    <main className="flex-1 flex flex-col min-w-0">
      <FormHeader
        title={form.name}
        onPreviewOpen={() => setIsPreviewOpen(true)}
        handleOpenAction={handleOpenAction}
      />
      <div className="flex-1 overflow-hidden relative">
        {children}

        {openAction === "themeSettings" && (
          <div className="absolute top-5 bottom-5 right-5 w-[340px] rounded-md border-[0.5px] border-neutral-200 shadow-lg bg-white overflow-hidden">
            <ThemeSettings
              settings={form.themeSettings}
              onSettingsChange={(settings) => {
                useFormStore.getState().updateForm(formId, {
                  themeSettings: settings,
                });
              }}
              onClose={() => handleOpenAction(null)}
            />
          </div>
        )}

        {openAction === "share" && (
          <div className="absolute top-5 bottom-5 right-5 w-[340px] rounded-md border-[0.5px] border-neutral-200 shadow-lg bg-white overflow-hidden">
            <ShareSettings
              formId={formId}
              onClose={() => handleOpenAction(null)}
            />
          </div>
        )}

        {openAction === "settings" && (
          <div className="absolute top-5 bottom-5 right-5 w-[340px] flex flex-col rounded-md border-[0.5px] border-neutral-200 shadow-lg bg-white overflow-hidden">
            <div className="flex items-center justify-between h-[52px] p-4">
              <div className="text-base font-medium">Form settings</div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => handleOpenAction(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Tabs defaultValue="general" className="w-full flex-1 overflow-y-auto p-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
              </TabsList>
              <TabsContent value="general" className='pt-4'>
                <GeneralSettings
                  formId={formId}
                  onClose={() => handleOpenAction(null)}
                />
              </TabsContent>
            </Tabs>
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
