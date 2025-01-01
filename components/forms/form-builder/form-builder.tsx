'use client';

import { useState, useRef } from 'react';
import { FormField } from '@/types/form';
import { ButtonSettings } from '@/types/button';
import { useThemeStore } from '@/stores/theme-store';
import { FormHeader } from './form-header';
import { FormContent } from './form-content';
import { FormFieldSettings } from '../settings/field-settings/field-settings';
import { ThemeSettings } from '../settings/theme-settings';
import { ButtonSettings as ButtonSettingsPanel } from '../settings/button-settings';

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
  themeSettings?: {
    coverType: 'none' | 'color' | 'image';
    coverColor?: string;
    coverImage?: string;
    showLogo: boolean;
    logo?: string;
  };
  onThemeSettingsChange?: (settings: any) => void;
  fields?: FormField[];
  onFieldsChange?: (fields: FormField[]) => void;
  buttonSettings?: ButtonSettings;
  onButtonSettingsChange?: (settings: ButtonSettings) => void;
  enableReview?: boolean;
}

export function FormBuilder({
  isThemeSettingsOpen,
  onThemeSettingsOpenChange,
  title = '',
  onTitleChange,
  description = '',
  onDescriptionChange,
  themeSettings = { coverType: 'none', showLogo: true },
  onThemeSettingsChange,
  fields = [],
  onFieldsChange,
  buttonSettings,
  onButtonSettingsChange,
}: FormBuilderProps) {
  const [selectedField, setSelectedField] = useState<FormField | null>(null);
  const [showButtonSettings, setShowButtonSettings] = useState(false);
  const formBuilderRef = useRef<HTMLDivElement>(null);
  const settingsPanelRef = useRef<HTMLDivElement>(null);
  const { theme } = useThemeStore();

  return (
    <div className="relative h-full" ref={formBuilderRef}>
      <div className="h-full overflow-y-auto">
        <div
          className="w-full"
          style={
            {
              '--theme-primary': theme.colors.primary.value,
              '--theme-background': theme.colors.background,
              '--theme-text': theme.colors.text,
              '--theme-border': theme.colors.border,
              '--theme-radius':
                theme.borderRadius === 'none'
                  ? '0'
                  : theme.borderRadius === 'sm'
                  ? '0.125rem'
                  : theme.borderRadius === 'md'
                  ? '0.375rem'
                  : theme.borderRadius === 'lg'
                  ? '0.5rem'
                  : '9999px',
              '--theme-spacing':
                theme.spacing === 'compact'
                  ? '0.75rem'
                  : theme.spacing === 'comfortable'
                  ? '1.5rem'
                  : '2rem',
              '--theme-heading-font': theme.fonts.heading,
              '--theme-body-font': theme.fonts.body,
            } as React.CSSProperties
          }
        >
          <FormHeader
            title={title}
            description={description}
            themeSettings={themeSettings}
            onTitleChange={onTitleChange || (() => {})}
            onDescriptionChange={onDescriptionChange || (() => {})}
            onThemeSettingsChange={onThemeSettingsChange || (() => {})}
          />

          <FormContent
            fields={fields}
            onFieldsChange={onFieldsChange || (() => {})}
            onFieldClick={setSelectedField}
            selectedFieldId={selectedField?.id}
            buttonSettings={buttonSettings}
            onButtonSettingsChange={onButtonSettingsChange}
            onButtonSettingsOpen={() => setShowButtonSettings(true)}
          />
        </div>
      </div>

      {selectedField &&
        !['heading', 'paragraph', 'page-break'].includes(
          selectedField.type
        ) && (
          <div
            className="absolute top-5 bottom-5 right-5 w-[340px] rounded-md border-[0.5px] border-neutral-200 shadow-lg bg-white overflow-hidden"
            ref={settingsPanelRef}
          >
            <FormFieldSettings
              field={selectedField}
              onFieldUpdate={(field) => {
                onFieldsChange?.(
                  fields.map((f) => (f.id === field.id ? field : f))
                );
                setSelectedField(field);
              }}
              onDismiss={() => setSelectedField(null)}
              fields={fields}
            />
          </div>
        )}

      {isThemeSettingsOpen && (
        <div className="absolute top-5 bottom-5 right-5 w-[340px] rounded-md border-[0.5px] border-neutral-200 shadow-lg bg-white overflow-hidden">
          <ThemeSettings
            settings={themeSettings}
            onSettingsChange={onThemeSettingsChange}
            onClose={() => onThemeSettingsOpenChange(false)}
          />
        </div>
      )}

      {showButtonSettings && (
        <div className="absolute top-5 bottom-5 right-5 w-[340px] rounded-md border-[0.5px] border-neutral-200 shadow-lg bg-white overflow-hidden">
          <ButtonSettingsPanel
            settings={
              buttonSettings || {
                label: 'Submit',
                size: 'default',
                fullWidth: false,
              }
            }
            onSettingsChange={onButtonSettingsChange || (() => {})}
            open={showButtonSettings}
            onOpenChange={setShowButtonSettings}
          />
        </div>
      )}
    </div>
  );
}
