import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeSettings } from '@/types/form';

const defaultTheme: ThemeSettings = {
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

// ... rest of the file stays the same