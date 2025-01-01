'use client';

import { useState, useEffect, useCallback } from 'react';
import { FormField } from '@/types/form';
import { getAvailableOperators, getFieldValues } from '@/lib/utils/condition-validation';

export function useFieldCondition(
  condition: {
    id: string;
    fieldId: string;
    operator: string;
    value: string;
  },
  availableFields: FormField[],
  onUpdate: (id: string, updates: any) => void
) {
  const [selectedField, setSelectedField] = useState<FormField | undefined>(
    availableFields.find(f => f.id === condition.fieldId)
  );

  const [operators, setOperators] = useState<{ value: string; label: string }[]>([]);
  const [values, setValues] = useState<{ label: string; value: string }[]>([]);

  // Update operators and values whenever selected field changes
  useEffect(() => {
    if (!selectedField) {
      setOperators([]);
      setValues([]);
      return;
    }

    // Get operators based on field type
    const newOperators = getAvailableOperators(selectedField.type);
    setOperators(newOperators);

    // Get values based on field type and settings
    const newValues = getFieldValues(selectedField);
    setValues(newValues);

    // If current operator/value is invalid for new field type, reset them
    const isValidOperator = newOperators.some(op => op.value === condition.operator);
    const isValidValue = newValues.some(v => v.value === condition.value);

    if (!isValidOperator || !isValidValue) {
      onUpdate(condition.id, {
        operator: isValidOperator ? condition.operator : '',
        value: isValidValue ? condition.value : ''
      });
    }
  }, [selectedField, condition.id, condition.operator, condition.value, onUpdate]);

  // Update selected field when fieldId changes
  useEffect(() => {
    const field = availableFields.find(f => f.id === condition.fieldId);
    if (field !== selectedField) {
      setSelectedField(field);
    }
  }, [condition.fieldId, availableFields, selectedField]);

  const handleFieldChange = useCallback((fieldId: string) => {
    const field = availableFields.find(f => f.id === fieldId);
    setSelectedField(field);
    
    // Reset operator and value when field changes
    onUpdate(condition.id, {
      fieldId,
      operator: '',
      value: ''
    });
  }, [availableFields, condition.id, onUpdate]);

  return {
    selectedField,
    operators,
    values,
    handleFieldChange
  };
}