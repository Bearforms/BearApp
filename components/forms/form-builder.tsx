'use client';

import { useState, useRef } from 'react';
import { FormTitle } from './form-title';
import { FormDescription } from './form-description';
import { FormFieldSettings } from './settings/field-settings/field-settings';
import { ThemeSettings } from './settings/theme-settings';
import { FormLogo } from './form-logo';
import { ButtonSettings } from './settings/button-settings';
import { ThankYouSettings } from './settings/thank-you-settings';
import { ButtonSettings as ButtonSettingsType } from '@/types/button';
import { cn } from '@/lib/utils';
import {
  FormField,
  ThankYouSettings as ThankYouSettingsType,
  ThemeSettings as ThemeSettingsType,
} from '@/types/form';
import { useFormTheme } from '@/hooks/use-form-theme';
import { useGoogleFonts } from '@/hooks/use-google-fonts';
import { FormContent } from './form-builder/form-content';
import { useFormStyles } from './form-builder/use-form-styles';
import { defaultThemeSettings, defaultThankYouSettings } from '@/lib/constants/theme-defaults';

const defaultButtonSettings: ButtonSettingsType = {
  label: 'Submit',
  size: 'default',
  fullWidth: false,
};

interface FormBuilderProps {
  isThemeSettingsOpen: boolean;
  onThemeSettingsOpenChange: (open: boolean) => void;
  isPreviewOpen: boolean;
  onPreviewOpenChange: (open: boolean) => void;
  isShareOpen: boolean;
  onShareOpenChange: (open: boolean) => void;
  title?: string;
  onTitleChange?: (title: string) => void;
  description?: string;
  onDescriptionChange?: (description: string) => void;
  themeSettings?: ThemeSettingsType;
  onThemeSettingsChange?: (settings: ThemeSettingsType) => void;
  fields?: FormField[];
  onFieldsChange?: (fields: FormField[]) => void;
  buttonSettings?: ButtonSettingsType;
  onButtonSettingsChange?: (settings: ButtonSettingsType) => void;
  enableReview?: boolean;
  thankYouSettings?: ThankYouSettingsType;
  onThankYouSettingsChange?: (settings: ThankYouSettingsType) => void;
}

export function FormBuilder({
  isThemeSettingsOpen,
  onThemeSettingsOpenChange,
  isPreviewOpen,
  onPreviewOpenChange,
  isShareOpen,
  onShareOpenChange,
  title = '',
  onTitleChange,
  description = '',
  onDescriptionChange,
  themeSettings = defaultThemeSettings,
  onThemeSettingsChange,
  fields = [],
  onFieldsChange,
  buttonSettings = defaultButtonSettings,
  onButtonSettingsChange,
  enableReview = false,
  thankYouSettings = defaultThankYouSettings,
  onThankYouSettingsChange,
}: FormBuilderProps) {
  const [selectedField, setSelectedField] = useState<FormField | null>(null);
  const [showButtonSettings, setShowButtonSettings] = useState(false);
  const [showThankYouSettings, setShowThankYouSettings] = useState(false);
  const formBuilderRef = useRef<HTMLDivElement>(null);
  
  // Merge theme settings with defaults
  const mergedThemeSettings = {
    ...defaultThemeSettings,
    ...themeSettings
  };
  
  const { styles } = useFormStyles(mergedThemeSettings);

  // Load Google Fonts
  useGoogleFonts(
    mergedThemeSettings?.fonts?.heading || 'Inter',
    mergedThemeSettings?.fonts?.body || 'Inter'
  );

  const handleLogoChange = (logo: string) => {
    onThemeSettingsChange?.({
      ...mergedThemeSettings,
      logo,
    });
  };

  return (
    <div className="relative h-full" ref={formBuilderRef}>
      <div className="h-full overflow-y-auto p-8 flex justify-center">
        <div
          className="sm:w-full lg:w-8/12 h-fit rounded-md overflow-hidden shadow-sm form-theme"
          style={styles.container}
        >
          {mergedThemeSettings?.coverType !== 'none' && (
            <div className="w-full h-40">
              {mergedThemeSettings?.coverType === 'color' && (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundColor: mergedThemeSettings.coverColor || '#f3f4f6',
                  }}
                />
              )}
              {mergedThemeSettings?.coverType === 'image' &&
                mergedThemeSettings.coverImage && (
                  <img
                    src={mergedThemeSettings.coverImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
            </div>
          )}

          <div
            className={cn(
              'max-w-[640px] mx-auto px-5 pb-12 relative',
              mergedThemeSettings?.showLogo &&
                mergedThemeSettings?.coverType !== 'none' &&
                'pt-24',
              mergedThemeSettings?.showLogo &&
                mergedThemeSettings?.coverType === 'none' &&
                'pt-52',
              !mergedThemeSettings?.showLogo && 'pt-16'
            )}
          >
            {mergedThemeSettings?.showLogo && (
              <div
                className={cn(
                  'absolute left-5',
                  mergedThemeSettings?.coverType !== 'none' ? '-top-12' : 'top-16'
                )}
              >
                <FormLogo
                  logo={mergedThemeSettings?.logo}
                  onLogoChange={handleLogoChange}
                />
              </div>
            )}

            <div className="space-y-2 mb-8">
              <FormTitle
                title={title}
                onTitleChange={onTitleChange}
                headingFont={mergedThemeSettings?.fonts?.heading}
              />
              <FormDescription
                description={description}
                onDescriptionChange={onDescriptionChange}
              />
            </div>

            <FormContent
              fields={fields}
              onFieldsChange={onFieldsChange}
              selectedFieldId={selectedField?.id}
              onFieldSelect={setSelectedField}
              buttonSettings={buttonSettings}
              onButtonSettingsChange={onButtonSettingsChange}
              onButtonSettingsOpen={() => setShowButtonSettings(true)}
              themeSettings={mergedThemeSettings}
              thankYouSettings={thankYouSettings}
              onThankYouSettingsOpen={() => setShowThankYouSettings(true)}
            />
          </div>
        </div>
      </div>

      {/* Settings panels */}
      {selectedField && (
        <div className="absolute top-5 bottom-5 right-5 w-[340px] rounded-md border-[0.5px] border-neutral-200 shadow-lg bg-white overflow-hidden">
          <FormFieldSettings
            field={selectedField}
            onFieldUpdate={(updatedField) => {
              onFieldsChange?.(
                fields.map((f) =>
                  f.id === selectedField.id ? { ...f, ...updatedField } : f
                )
              );
              setSelectedField(updatedField);
            }}
            onDismiss={() => setSelectedField(null)}
            fields={fields}
          />
        </div>
      )}

      {showButtonSettings && (
        <div className="absolute top-5 bottom-5 right-5 w-[340px] rounded-md border-[0.5px] border-neutral-200 shadow-lg bg-white overflow-hidden">
          <ButtonSettings
            settings={buttonSettings}
            onSettingsChange={onButtonSettingsChange}
            open={showButtonSettings}
            onOpenChange={setShowButtonSettings}
            themeSettings={mergedThemeSettings}
          />
        </div>
      )}

      {showThankYouSettings && (
        <div className="absolute top-5 bottom-5 right-5 w-[340px] rounded-md border-[0.5px] border-neutral-200 shadow-lg bg-white overflow-hidden">
          <ThankYouSettings
            settings={thankYouSettings}
            onSettingsChange={onThankYouSettingsChange}
            onClose={() => setShowThankYouSettings(false)}
            themeSettings={mergedThemeSettings}
          />
        </div>
      )}
    </div>
  );
}