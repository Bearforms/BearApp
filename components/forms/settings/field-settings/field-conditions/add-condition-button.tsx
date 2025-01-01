'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface AddConditionButtonProps {
  onClick: () => void;
}

export function AddConditionButton({ onClick }: AddConditionButtonProps) {
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={onClick}
      className="w-full border-dashed"
    >
      <Plus className="h-4 w-4 mr-2" />
      Add condition
    </Button>
  );
}