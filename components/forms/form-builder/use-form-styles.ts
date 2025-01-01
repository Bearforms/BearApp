'use client';

import { ThemeSettings } from '@/types/form';

export function useFormStyles(themeSettings?: Partial<ThemeSettings>) {
  const getStyles = () => ({
    container: {
      '--theme-primary': themeSettings?.colors?.primary?.value || '#2563eb',
      '--theme-background': themeSettings?.colors?.background || '#ffffff',
      '--theme-text': themeSettings?.colors?.text || '#0f172a',
      '--theme-text-secondary': themeSettings?.colors?.textSecondary || '#6b7280',
      '--theme-border': themeSettings?.colors?.border || '#e2e8f0',
      '--theme-heading-font': themeSettings?.fonts?.heading || 'Inter',
      '--theme-body-font': themeSettings?.fonts?.body || 'Inter',
      '--theme-radius': {
        none: '0',
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        full: '9999px'
      }[themeSettings?.borderRadius || 'md'],
      '--theme-spacing': {
        compact: '0.75rem',
        comfortable: '1.5rem',
        spacious: '2rem'
      }[themeSettings?.spacing || 'comfortable'],
      backgroundColor: themeSettings?.colors?.background || '#ffffff',
      color: themeSettings?.colors?.text || '#0f172a',
    } as React.CSSProperties,
  });

  return {
    styles: getStyles(),
  };
}