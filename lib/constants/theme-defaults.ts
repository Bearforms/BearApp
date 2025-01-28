import { ButtonSettings } from '@/types/button';

export const defaultThemeSettings = {
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
  borderRadius: 'md' as const,
  spacing: 'comfortable' as const,
  coverType: 'none' as const,
  showLogo: true,
  coverColor: '#f3f4f6'
};

export const defaultThankYouSettings = {
  heading: 'Thank you for your submission',
  message: 'Your response has been recorded. We appreciate your time.',
  showButton: false,
  buttonText: 'Continue',
  buttonUrl: '',
  buttonStyle: 'outline' as const
};

export const defaultFormSettings = {
  language: 'english',
  showStepCount: false,
  recapture: false,
  requireLogin: false,
  loginPassword: '',
  enableReview: false,
  stopResponses: false,
  enableResponseLimit: false,
  responseLimit: '',
  expiryDate: '',
  enableCloseFormMessage: false,
  closeFormMessage: '',
};

export const defaultButtonSettings: ButtonSettings = {
  label: 'Submit',
  size: 'default',
  fullWidth: false,
  variant: 'primary',
};