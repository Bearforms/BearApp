'use client';

import { FormField, ThemeSettings, ThankYouSettings } from '@/types/form';
import { ButtonSettings } from '@/types/button';
import { FormLayout } from './form-layout';
import { FormPreviewField } from './form-preview-field';
import { FormNavigation } from './form-navigation';
import { ThankYouContent } from './thank-you-content';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FormPreviewContentProps {
  title: string;
  description?: string;
  fields: FormField[];
  formData: Record<string, any>;
  isSubmitted: boolean;
  currentStep: number;
  completedSteps: number[];
  themeSettings?: ThemeSettings;
  buttonSettings?: ButtonSettings;
  thankYouSettings?: ThankYouSettings;
  isSubmitting: boolean;
  getFieldError: (fieldId: string) => string | undefined;
  handleFieldChange: (fieldId: string, value: any) => void;
  submitForm: (e: React.FormEvent) => void;
  validateStep: (fields: FormField[]) => boolean;
  hasValidFormData: () => boolean;
  onStepChange: (step: number) => void;
  onNext: () => void;
  onBack: () => void;
  onFormDataChange: (data: Record<string, any>) => void;
  isLastStep: boolean;
  visibleSteps: number[];
}

export function FormPreviewContent({
  title,
  description,
  fields,
  formData,
  isSubmitted,
  currentStep,
  completedSteps,
  themeSettings,
  buttonSettings,
  thankYouSettings,
  isSubmitting,
  getFieldError,
  handleFieldChange,
  submitForm,
  validateStep,
  hasValidFormData,
  onStepChange,
  onNext,
  onBack,
  onFormDataChange,
  isLastStep,
  visibleSteps,
}: FormPreviewContentProps) {
  const steps = fields.reduce((acc: FormField[][], field) => {
    if (field.type === 'page-break') {
      acc.push([]);
    } else {
      if (acc.length === 0) acc.push([]);
      acc[acc.length - 1].push(field);
    }
    return acc;
  }, []);

  if (isSubmitted) {
    return (
      <ScrollArea className="flex-1">
        <FormLayout themeSettings={themeSettings}>
          <ThankYouContent
            settings={thankYouSettings}
            themeSettings={themeSettings}
          />
        </FormLayout>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <FormLayout themeSettings={themeSettings}>
        <div>
          <div className="space-y-4 header mb-8">
            {title && (
              <h1 className={cn('form-title text-4xl font-bold form-heading')}>
                {title}
              </h1>
            )}
            {description && (
              <p className={cn('form-description form-body text-[var(--theme-text-secondary)]')}>
                {description}
              </p>
            )}
          </div>

          <form onSubmit={submitForm} noValidate>
            <div className="space-y-[var(--theme-spacing)]">
              {steps[currentStep]?.map((field) => (
                <FormPreviewField
                  key={field.id}
                  field={field}
                  themeSettings={themeSettings}
                  preview={true}
                  value={formData[field.id]}
                  onChange={(value) => {
                    handleFieldChange(field.id, value);
                    onFormDataChange({
                      ...formData,
                      [field.id]: value,
                    });
                  }}
                  error={getFieldError(field.id)}
                  formData={formData}
                  fields={fields}
                />
              ))}

              <FormNavigation
                currentStep={currentStep}
                totalSteps={steps.length}
                onBack={onBack}
                onNext={onNext}
                isLastStep={isLastStep}
                isSubmitting={isSubmitting}
                hasValidData={hasValidFormData()}
                buttonSettings={buttonSettings}
                themeSettings={themeSettings}
                visibleStepNumber={visibleSteps.indexOf(currentStep) + 1}
                totalVisibleSteps={visibleSteps.length}
              />
            </div>
          </form>
        </div>
      </FormLayout>
    </ScrollArea>
  );
}