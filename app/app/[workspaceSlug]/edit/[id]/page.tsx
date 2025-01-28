'use client';

import { useParams } from 'next/navigation';
import { useFormStore } from '@/stores/form-store';
import { FormPageLayout } from '@/components/forms/layout/form-page-layout';
import { FormBuilder } from '@/components/forms/form-builder';
import { useEffect, useState } from 'react';
import { FormField, ThemeSettings, ThankYouSettings } from '@/types/form';
import { ButtonSettings } from '@/types/button';
import { useMutation } from '@tanstack/react-query';
import { getWorkspacesForm } from '@/actions/workspaces/getWorkspacesForm';
import { Skeleton } from '@/components/ui/skeleton';
import { HeaderSkeleton } from '@/components/skeletons/header-skeleton';
import { useSession } from '@/hooks/use-session';

export default function EditFormPage() {

  const [isLoadingForms, setIsLoadingForm] = useState(false);

  const params = useParams();
  const formId = params.id as string;
  const updateFormOnStore = useFormStore((state) => state.updateForm);
  const setForm = useFormStore((state) => state.setForm);
  const form = useFormStore((state) => state.form);
  const { user } = useSession();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fields, setFields] = useState<FormField[]>([]);
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>();
  const [buttonSettings, setButtonSettings] = useState<ButtonSettings>();
  const [thankYouSettings, setThankYouSettings] = useState<ThankYouSettings>();


  const { isPending, mutate } = useMutation({
    mutationFn: getWorkspacesForm,
    onSuccess: (data) => {
      setForm(data);
      setIsLoadingForm(false);
    },
    onError: () => {
      setIsLoadingForm(false);
    }
  });

  useEffect(() => {
    setForm(null);
    if (params?.workspaceSlug && formId) mutate({ workspaceSlug: params?.workspaceSlug as string, formId: formId as string });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, params?.workspaceSlug, formId]);
  
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
      await updateFormOnStore(form!.id, {
        ...updates,
        lastUpdated: new Date().toISOString(),
        updated_by: user?.id,
      });
    }
  };

  if (isPending || isLoadingForms) {
    return (
      <div className="flex-1 flex flex-col min-w-0">
        <HeaderSkeleton />
        <div className="w-full lg:w-8/12 bg-white mx-auto h-full rounded-md">
          <div className="space-y-8 max-w-[640px] mx-auto px-5 py-20">
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
            </div>

            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}

            <Skeleton className="h-10 w-24" />
          </div>
        </div>

      </div>
    );
  }

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
        onThemeSettingsOpenChange={() => { }}
        isPreviewOpen={false}
        onPreviewOpenChange={() => { }}
        isShareOpen={false}
        onShareOpenChange={() => { }}
      />
    </FormPageLayout>
  );
}
