import { FormField } from '@/types/form';

export function validateField(field: FormField, value: any): string | null {
  // Skip validation for content fields
  if (
    field.type === 'heading' ||
    field.type === 'paragraph' ||
    field.type === 'page-break'
  ) {
    return null;
  }

  // Skip validation if field is hidden
  if (field.settings?.visible === false) {
    return null;
  }

  const validation = field.validation;
  if (!validation) return null;

  // Required field check
  if (validation.required) {
    if (value === undefined || value === null || value === '') {
      return `This field is required`;
    }

    // Additional checks for specific field types
    switch (field.type) {
      case 'multi-select':
        if (Array.isArray(value) && value.length === 0) {
          return `Please select at least one option`;
        }
        break;
      case 'date':
      case 'time':
        if (!value) {
          return `This field is required`;
        }
        break;
      case 'star-rating':
      case 'number-rating':
        if (value === undefined || value === null) {
          return `This field is required`;
        }
        break;
      case 'select':
      case 'radio':
        if (!value) {
          return `Please select an option`;
        }
        break;
    }
  }

  // Skip other validations if field is empty and not required
  if (!value && !validation.required) return null;

  switch (field.type) {
    case 'text':
    case 'textarea':
      if (validation.minLength && value.length < validation.minLength) {
        return `${field.label} must be at least ${validation.minLength} characters`;
      }
      if (validation.maxLength && value.length > validation.maxLength) {
        return `${field.label} must be no more than ${validation.maxLength} characters`;
      }
      if (validation.pattern) {
        const regex = new RegExp(validation.pattern);
        if (!regex.test(value)) {
          return `${field.label} format is invalid`;
        }
      }
      break;

    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
      break;

    case 'phone':
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(value)) {
        return 'Please enter a valid phone number';
      }
      break;

    case 'number-rating':
      const num = Number(value);
      if (validation.min !== undefined && num < validation.min) {
        return `Number must be at least ${validation.min}`;
      }
      if (validation.max !== undefined && num > validation.max) {
        return `Number must be no more than ${validation.max}`;
      }
      break;

    case 'file':
      if (value instanceof FileList) {
        const file = value[0];
        if (
          field.settings?.maxFileSize &&
          file.size > field.settings.maxFileSize * 1024 * 1024
        ) {
          return `File size must be less than ${field.settings.maxFileSize}MB`;
        }
        if (field.settings?.acceptedFileTypes?.length) {
          const fileType = file.name.split('.').pop()?.toLowerCase();
          if (!field.settings.acceptedFileTypes.includes(`.${fileType}`)) {
            return `Accepted file types: ${field.settings.acceptedFileTypes.join(
              ', '
            )}`;
          }
        }
      }
      break;

    case 'select':
    case 'multi-select':
      if (field.type === 'multi-select') {
        const selected = Array.isArray(value) ? value : [];
        if (validation.min && selected.length < validation.min) {
          return `Please select at least ${validation.min} options`;
        }
        if (validation.max && selected.length > validation.max) {
          return `Please select no more than ${validation.max} options`;
        }
      }
      break;

    case 'url':
      const urlRegex =
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      if (!urlRegex.test(value)) {
        return 'Please enter a valid URL';
      }
      if (
        validation.protocol &&
        !value.startsWith('http://') &&
        !value.startsWith('https://')
      ) {
        return 'URL must start with http:// or https://';
      }
      break;

    case 'date':
      if (value && !(value instanceof Date) && isNaN(Date.parse(value))) {
        return 'Please enter a valid date';
      }
      break;

    case 'time':
      // Updated time validation regex to match our format exactly
      const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9]\s(AM|PM)$/;
      if (!timeRegex.test(value)) {
        return 'Please enter a valid time in HH:MM AM/PM format';
      }
      break;

    case 'star-rating':
    case 'number-rating':
      const rating = Number(value);
      if (isNaN(rating)) {
        return `Please provide a valid rating`;
      }
      const max =
        field.type === 'star-rating'
          ? field.settings?.maxStars || 5
          : field.settings?.maxRating || 10;
      if (rating < 1 || rating > max) {
        return `Rating must be between 1 and ${max}`;
      }
      break;
  }

  return null;
}
