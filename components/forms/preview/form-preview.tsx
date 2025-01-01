'use client';

import { useState } from 'react';
import { FormField, ThemeSettings, ThankYouSettings } from '@/types/form';
import { FormPreviewContent } from './form-preview-content';
import { FormPreviewHeader } from './form-preview-header';
import { FormPreviewDialog } from './form-preview-dialog';
import { useFormSubmission } from '@/hooks/use-form-submission';
import { useStepNavigation } from '@/hooks/use-step-navigation';
import { ButtonSettings } from '@/types/button';
import { getVisibleSteps } from '@/lib/utils/step-evaluation';

const defaultThankYouSettings: ThankYouSettings = {
  heading: 'Thank you for your submission',
  message: 'Your response has been recorded. We appreciate your time.',
  showButton: false,
  buttonText: 'Continue',
  buttonUrl: '',
  buttonStyle: 'outline',
};

interface FormPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  fields: FormField[];
  name: string;
  formId: string;
  themeSettings?: ThemeSettings;
  buttonSettings?: ButtonSettings;
  thankYouSettings?: ThankYouSettings;
}

export function FormPreview({
  open,
  onOpenChange,
  title,
  description = '',
  fields,
  name,
  formId,
  themeSettings,
  buttonSettings,
  thankYouSettings = defaultThankYouSettings,
}: FormPreviewProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    currentStep,
    completedSteps,
    nextStep,
    previousStep,
    isLastStep,
    moveToStep,
    setCompletedSteps
  } = useStepNavigation(fields);

  const {
    isSubmitting,
    getFieldError,
    handleFieldChange,
    handleSubmit: submitForm,
    validateStep,
    hasValidFormData,
  } = useFormSubmission({
    formId,
    fields: fields.filter(
      (f) =>
        f.type !== 'heading' &&
        f.type !== 'paragraph' &&
        f.type !== 'page-break' &&
        f.settings?.visible !== false
    ),
    onSuccess: () => {
      setIsSubmitted(true);
    },
  });

  const visibleSteps = getVisibleSteps(fields, formData);

  const handleClose = () => {
    onOpenChange(false);
    moveToStep(0, {});
    setCompletedSteps([]);
    setFormData({});
    setIsSubmitted(false);
  };

  return (
    <FormPreviewDialog open={open} onOpenChange={handleClose}>
      <FormPreviewHeader />
      <FormPreviewContent
        title={title}
        description={description}
        fields={fields}
        formData={formData}
        isSubmitted={isSubmitted}
        currentStep={currentStep}
        completedSteps={completedSteps}
        themeSettings={themeSettings}
        buttonSettings={buttonSettings}
        thankYouSettings={thankYouSettings}
        isSubmitting={isSubmitting}
        getFieldError={getFieldError}
        handleFieldChange={handleFieldChange}
        submitForm={submitForm}
        validateStep={validateStep}
        hasValidFormData={hasValidFormData}
        onStepChange={(step) => moveToStep(step, formData)}
        onNext={() => nextStep(formData)}
        onBack={() => previousStep(formData)}
        onFormDataChange={setFormData}
        isLastStep={isLastStep(formData)}
        visibleSteps={visibleSteps}
      />
    </FormPreviewDialog>
  );
}