'use client';

import { useState } from 'react';
import { useResponseStore } from '@/stores/response-store';
import { nanoid } from 'nanoid';
import { FormField } from '@/types/form';
import { validateField } from '@/lib/form-validation';

interface UseFormSubmissionProps {
  formId: string;
  fields: FormField[];
  onSuccess?: () => void;
}

export function useFormSubmission({
  formId,
  fields,
  onSuccess,
}: UseFormSubmissionProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const addResponse = useResponseStore((state) => state.addResponse);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    // Clear error for this field when value changes
    if (fieldErrors[fieldId]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    }
  };

  const validateForm = (
    fields: FormField[],
    values: Record<string, any>
  ): boolean => {
    const errors: Record<string, string> = {};
    let hasErrors = false;

    fields.forEach((field) => {
      if (
        field.type === 'heading' ||
        field.type === 'paragraph' ||
        field.type === 'page-break'
      ) {
        return;
      }

      // Skip hidden fields
      if (field.settings?.visible === false) {
        return;
      }

      const error = validateField(field, values[field.id]);
      if (error) {
        errors[field.id] = error;
        hasErrors = true;
      }
    });

    setFieldErrors(errors);
    return !hasErrors;
  };

  const hasValidFormData = () => {
    return Object.values(formData).some((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      if (value instanceof FileList) {
        return value.length > 0;
      }
      if (typeof value === 'boolean') {
        return value;
      }
      return value !== undefined && value !== null && value !== '';
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out non-input fields
    const formFields = fields.filter(
      (f) =>
        f.type !== 'heading' &&
        f.type !== 'paragraph' &&
        f.type !== 'page-break' &&
        f.settings?.visible !== false
    );

    const isValid = validateForm(formFields, formData);
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Transform the data to use field labels instead of IDs
      const labeledData = formFields.reduce((acc, field) => {
        if (formData[field.id] !== undefined) {
          acc[field.label] = formData[field.id];
        }
        return acc;
      }, {} as Record<string, any>);

      const response = {
        id: nanoid(),
        formId,
        data: labeledData,
        submittedAt: new Date().toISOString(),
      };

      addResponse(response);
      setIsSubmitted(true);
      onSuccess?.();
      setFormData({});
      setFieldErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateStep = (fields: FormField[]): boolean => {
    const stepFields = fields.filter(
      (f) =>
        f.type !== 'heading' &&
        f.type !== 'paragraph' &&
        f.type !== 'page-break' &&
        f.settings?.visible !== false
    );

    return validateForm(stepFields, formData);
  };

  return {
    formData,
    isSubmitting,
    isSubmitted,
    getFieldError: (fieldId: string) => fieldErrors[fieldId],
    handleFieldChange,
    handleSubmit,
    validateStep,
    clearErrors: () => setFieldErrors({}),
    hasValidFormData,
  };
}