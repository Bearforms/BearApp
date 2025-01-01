'use client';

import { useState, useCallback } from 'react';
import { FormField } from '@/types/form';
import { shouldShowStep } from '@/lib/utils/step-evaluation';

export function useStepNavigation(fields: FormField[]) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const getVisibleSteps = useCallback((formData: Record<string, any>) => {
    const steps: number[] = [0]; // First step is always visible
    let stepIndex = 1;

    fields.forEach((field) => {
      if (field.type === 'page-break') {
        if (shouldShowStep(field, formData, fields)) {
          steps.push(stepIndex);
        }
        stepIndex++;
      }
    });

    return steps;
  }, [fields]);

  const moveToStep = useCallback((step: number, formData: Record<string, any>) => {
    const visibleSteps = getVisibleSteps(formData);
    
    if (visibleSteps.includes(step)) {
      setCurrentStep(step);
    } else {
      // Find next visible step
      const nextStep = visibleSteps.find(s => s > step) ?? visibleSteps[0];
      setCurrentStep(nextStep);
    }
  }, [getVisibleSteps]);

  const nextStep = useCallback((formData: Record<string, any>) => {
    const visibleSteps = getVisibleSteps(formData);
    const currentIndex = visibleSteps.indexOf(currentStep);
    
    if (currentIndex < visibleSteps.length - 1) {
      setCurrentStep(visibleSteps[currentIndex + 1]);
      setCompletedSteps(prev => [...prev, currentStep]);
    }
  }, [currentStep, getVisibleSteps]);

  const previousStep = useCallback((formData: Record<string, any>) => {
    const visibleSteps = getVisibleSteps(formData);
    const currentIndex = visibleSteps.indexOf(currentStep);
    
    if (currentIndex > 0) {
      setCurrentStep(visibleSteps[currentIndex - 1]);
    }
  }, [currentStep, getVisibleSteps]);

  const isLastStep = useCallback((formData: Record<string, any>) => {
    const visibleSteps = getVisibleSteps(formData);
    return currentStep === visibleSteps[visibleSteps.length - 1];
  }, [currentStep, getVisibleSteps]);

  return {
    currentStep,
    completedSteps,
    moveToStep,
    nextStep,
    previousStep,
    isLastStep,
    setCompletedSteps,
    getVisibleSteps
  };
}