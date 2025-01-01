'use client';

import { ThemeSettings } from '@/types/form';
import { defaultThemeSettings } from '@/lib/constants/theme-defaults';

export function useFormTheme(settings: Partial<ThemeSettings> = {}) {
  // Deep merge with defaults, ensuring all required properties exist
  const themeSettings: ThemeSettings = {
    ...defaultThemeSettings,
    ...settings,
    colors: {
      ...defaultThemeSettings.colors,
      ...(settings.colors || {}),
      primary: {
        ...defaultThemeSettings.colors.primary,
        ...(settings.colors?.primary || {})
      }
    },
    fonts: {
      ...defaultThemeSettings.fonts,
      ...(settings.fonts || {})
    }
  };

  const getThemeStyles = () => ({
    container: {
      '--theme-primary': themeSettings.colors.primary.value,
      '--theme-background': themeSettings.colors.background,
      '--theme-text': themeSettings.colors.text,
      '--theme-text-secondary': themeSettings.colors.textSecondary,
      '--theme-border': themeSettings.colors.border,
      '--theme-heading-font': themeSettings.fonts.heading,
      '--theme-body-font': themeSettings.fonts.body,
      '--theme-radius': {
        none: '0',
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        full: '9999px'
      }[themeSettings.borderRadius],
      '--theme-spacing': {
        compact: '0.75rem',
        comfortable: '1.5rem',
        spacious: '2rem'
      }[themeSettings.spacing],
      backgroundColor: themeSettings.colors.background,
      color: themeSettings.colors.text,
    } as React.CSSProperties,
  });

  return {
    themeSettings,
    getThemeStyles
  };
}