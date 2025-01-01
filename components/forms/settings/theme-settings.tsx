'use client';

import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { CoverSettings } from './theme-settings/cover-settings';
import { LogoSettings } from './theme-settings/logo-settings';
import { ColorSettings } from './theme-settings/color-settings';
import { TypographySettings } from './theme-settings/typography-settings';
import { LayoutSettings } from './theme-settings/layout-settings';
import { SectionTitle } from './theme-settings/section-title';
import { ThemeSettings } from '@/types/form';
import { PanelLayout } from './panel-layout';

interface ThemeSettingsProps {
  settings?: ThemeSettings;
  onSettingsChange?: (settings: ThemeSettings) => void;
  onClose: () => void;
}

const defaultSettings: ThemeSettings = {
  colors: {
    primary: {
      name: 'Blue',
      value: '#2563eb',
      textColor: '#ffffff'
    },
    background: '#ffffff',
    text: '#0f172a',
    textSecondary: '#6b7280',
    border: '#e2e8f0'
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter'
  },
  borderRadius: 'md',
  spacing: 'comfortable',
  coverType: 'none',
  showLogo: true,
  coverColor: '#f3f4f6'
};

export function ThemeSettings({
  settings = defaultSettings,
  onSettingsChange,
  onClose,
}: ThemeSettingsProps) {
  const [isUploading, setIsUploading] = useState(false);

  // Merge provided settings with defaults
  const mergedSettings: ThemeSettings = {
    ...defaultSettings,
    ...settings,
    colors: {
      ...defaultSettings.colors,
      ...settings?.colors
    },
    fonts: {
      ...defaultSettings.fonts,
      ...settings?.fonts
    }
  };

  const handleFileUpload = async (file: File, type: 'cover' | 'logo') => {
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please select an image under 5MB',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          if (type === 'cover') {
            onSettingsChange?.({
              ...mergedSettings,
              coverType: 'image',
              coverImage: reader.result,
            });
          } else {
            onSettingsChange?.({
              ...mergedSettings,
              logo: reader.result,
            });
          }
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploading(false);
    }
  };

  const handleColorChange = (
    type: 'primary' | 'background' | 'text' | 'textSecondary' | 'border',
    color: string
  ) => {
    onSettingsChange?.({
      ...mergedSettings,
      colors: {
        ...mergedSettings.colors,
        [type]:
          type === 'primary'
            ? { ...mergedSettings.colors.primary, value: color }
            : color,
      },
    });
  };

  const handleFontChange = (type: 'heading' | 'body', font: string) => {
    onSettingsChange?.({
      ...mergedSettings,
      fonts: {
        ...mergedSettings.fonts,
        [type]: font,
      },
    });
  };

  const handleLayoutChange = (
    type: 'borderRadius' | 'spacing',
    value: typeof mergedSettings.borderRadius | typeof mergedSettings.spacing
  ) => {
    onSettingsChange?.({
      ...mergedSettings,
      [type]: value,
    });
  };

  return (
    <PanelLayout
      title="Theme Settings"
      onClose={onClose}
      themeSettings={mergedSettings}
    >
      <div>
        <SectionTitle description="Customize the header area of your form">
          Header
        </SectionTitle>
        <div className="mt-4 space-y-6">
          <CoverSettings
            coverType={mergedSettings.coverType}
            coverColor={mergedSettings.coverColor}
            onCoverTypeChange={(type) =>
              onSettingsChange?.({ ...mergedSettings, coverType: type })
            }
            onCoverColorChange={(color) =>
              onSettingsChange?.({ ...mergedSettings, coverColor: color })
            }
            onCoverImageChange={(file) => handleFileUpload(file, 'cover')}
            isUploading={isUploading}
          />

          <LogoSettings
            showLogo={mergedSettings.showLogo}
            onShowLogoChange={(show) =>
              onSettingsChange?.({ ...mergedSettings, showLogo: show })
            }
            onLogoChange={(file) => handleFileUpload(file, 'logo')}
            isUploading={isUploading}
          />
        </div>
      </div>

      <div className="mt-4 space-y-6">
        <ColorSettings
          primaryColor={mergedSettings.colors.primary.value}
          backgroundColor={mergedSettings.colors.background}
          textColor={mergedSettings.colors.text}
          textSecondaryColor={mergedSettings.colors.textSecondary}
          borderColor={mergedSettings.colors.border}
          onPrimaryColorChange={(color) => handleColorChange('primary', color)}
          onBackgroundColorChange={(color) =>
            handleColorChange('background', color)
          }
          onTextColorChange={(color) => handleColorChange('text', color)}
          onTextSecondaryColorChange={(color) => 
            handleColorChange('textSecondary', color)
          }
          onBorderColorChange={(color) => handleColorChange('border', color)}
        />

        <TypographySettings
          headingFont={mergedSettings.fonts.heading}
          bodyFont={mergedSettings.fonts.body}
          onHeadingFontChange={(font) => handleFontChange('heading', font)}
          onBodyFontChange={(font) => handleFontChange('body', font)}
        />

        <LayoutSettings
          borderRadius={mergedSettings.borderRadius}
          spacing={mergedSettings.spacing}
          onBorderRadiusChange={(value) =>
            handleLayoutChange('borderRadius', value as any)
          }
          onSpacingChange={(value) =>
            handleLayoutChange('spacing', value as any)
          }
        />
      </div>
    </PanelLayout>
  );
}