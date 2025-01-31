'use client';

type ColorScale = 'gray' | 'neutral' | 'slate' | 'zinc';

const colorScales = {
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  zinc: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
};

export function getColorScale(scale: ColorScale) {
  return colorScales[scale];
}

export function replaceColorScale(content: string, fromScale: ColorScale, toScale: ColorScale): string {
  const regex = new RegExp(`\\b${fromScale}-([0-9]{2,3})\\b`, 'g');
  return content.replace(regex, `${toScale}-$1`);
}

export function updateColorScale(files: { path: string; content: string }[], fromScale: ColorScale, toScale: ColorScale) {
  return files.map(file => ({
    path: file.path,
    content: replaceColorScale(file.content, fromScale, toScale)
  }));
}