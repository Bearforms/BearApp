'use client';

import { FormLogo } from '../form-logo';
import { FormTitle } from '../form-title';
import { FormDescription } from '../form-description';
import { cn } from '@/lib/utils';

interface FormHeaderProps {
  title: string;
  description: string;
  themeSettings: {
    coverType: 'none' | 'color' | 'image';
    coverColor?: string;
    coverImage?: string;
    showLogo: boolean;
    logo?: string;
  };
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onThemeSettingsChange: (settings: any) => void;
}

export function FormHeader({
  title,
  description,
  themeSettings,
  onTitleChange,
  onDescriptionChange,
  onThemeSettingsChange,
}: FormHeaderProps) {
  const hasCover = themeSettings.coverType !== 'none';
  const showLogo = themeSettings.showLogo;

  return (
    <>
      {hasCover && (
        <div className="w-full h-40">
          {themeSettings.coverType === 'color' && (
            <div
              className="w-full h-full"
              style={{ backgroundColor: themeSettings.coverColor || '#f3f4f6' }}
            />
          )}
          {themeSettings.coverType === 'image' && themeSettings.coverImage && (
            <img
              src={themeSettings.coverImage}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}

      <div
        className={cn(
          'max-w-[640px] mx-auto px-5 relative',
          showLogo && 'pt-20', // Same spacing whether logo is present or not
          !showLogo && 'pt-12' // Less space when logo is disabled
        )}
      >
        {showLogo && (
          <div className="absolute -top-12 left-5">
            <FormLogo
              logo={themeSettings.logo}
              onLogoChange={(logo) =>
                onThemeSettingsChange({
                  ...themeSettings,
                  logo,
                })
              }
            />
          </div>
        )}

        <div className="space-y-2 mb-8">
          <FormTitle title={title} onTitleChange={onTitleChange} />
          <FormDescription
            description={description}
            onDescriptionChange={onDescriptionChange}
            onAddField={function (type: string): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
      </div>
    </>
  );
}
