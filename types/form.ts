import { ButtonSettings } from './button';
import { ConditionSettings } from './conditions';
import { StepConditionSettings } from './step-conditions';

export interface FormFieldSettings {
  width?: 'full' | 'half';
  visible?: boolean;
  showLabel?: boolean;
  showPlaceholder?: boolean;
  showHelperText?: boolean;
  maxFileSize?: number;
  acceptedFileTypes?: string[];
  multiple?: boolean;
  maxStars?: number;
  maxRating?: number;
  allowHalfStars?: boolean;
  showValues?: boolean;
  headingLevel?: 1 | 2 | 3;
  stepTitle?: string;
  stepDescription?: string;
  checkboxText?: string;
  clearable?: boolean;
  searchable?: boolean;

}

export interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  helperText?: string;
  content?: string;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
    protocol?: boolean;
  };
  options?: Array<{
    label: string;
    value: string;
  }>;
  settings?: FormFieldSettings & ConditionSettings & StepConditionSettings;
}

export interface ThemeSettings {
  colors: {
    primary: {
      name: string;
      value: string;
      textColor: string;
    };
    background: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  spacing: 'compact' | 'comfortable' | 'spacious';
  coverType: 'none' | 'color' | 'image';
  showLogo: boolean;
  coverColor?: string;
  coverImage?: string;
  logo?: string;
}

export interface FormSettings {
  language: string;
  showStepCount: boolean;
  recapture: boolean;
  requireLogin: boolean;
  loginPassword: string;
  enableReview: boolean;
  stopResponses: boolean;
  enableResponseLimit: boolean;
  responseLimit: string;
  expiryDate: string;
  enableCloseFormMessage: boolean;
  closeFormMessage: string;
}

export interface ThankYouSettings {
  heading: string;
  message: string;
  showButton: boolean;
  buttonText: string;
  buttonUrl: string;
  buttonStyle?: 'primary' | 'outline';
}

export interface Form {
  id: string;
  name: string;
  title: string;
  description?: string;
  fields: FormField[];
  formSettings: FormSettings;
  themeSettings?: ThemeSettings;
  buttonSettings?: ButtonSettings;
  thankYouSettings?: ThankYouSettings;
  responses: number;
  lastUpdated: string;
  deletedAt?: string;
  added_by: string;
  updated_by: string;
  workspace_id: string;
}