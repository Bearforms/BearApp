'use client';

import { Button } from '@/components/ui/button';
import { FormSubmitButton } from '../form-submit-button';
import { ButtonSettings, ThemeSettings } from '@/types/form';
import { ArrowLeft } from 'lucide-react';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  isLastStep: boolean;
  isSubmitting: boolean;
  hasValidData: boolean;
  buttonSettings?: ButtonSettings;
  themeSettings?: ThemeSettings;
  visibleStepNumber?: number;
  totalVisibleSteps?: number;
}

export function FormNavigation({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  isLastStep,
  isSubmitting,
  hasValidData,
  buttonSettings,
  themeSettings,
  visibleStepNumber = 1,
  totalVisibleSteps = 1,
}: FormNavigationProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        {currentStep > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="gap-x-2 border-[var(--form-border)] rounded-[var(--form-radius)] bg-[var(--form-background)] hover:bg-[var(--form-background)] text-[var(--form-text)] hover:opacity-80 form-body"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        )}

        {!isLastStep ? (
          <Button
            type="button"
            onClick={onNext}
            className="form-body"
            style={{
              backgroundColor: themeSettings?.colors?.primary.value,
              color: 'var(--form-background)',
              borderRadius: 'var(--form-radius)',
            }}
          >
            Next
          </Button>
        ) : (
          <FormSubmitButton
            preview
            settings={buttonSettings}
            isLoading={isSubmitting}
            disabled={!hasValidData}
            themeSettings={themeSettings}
            style={{
              borderRadius: 'var(--form-radius)',
            }}
          />
        )}
      </div>

      {totalVisibleSteps > 1 && (
        <p className="text-sm text-[var(--theme-text)] opacity-60 form-body">
          Step {visibleStepNumber} of {totalVisibleSteps}
        </p>
      )}
    </div>
  );
}