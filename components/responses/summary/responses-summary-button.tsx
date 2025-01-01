'use client';

import { Button } from '@/components/ui/button';
import { BarChart2 } from 'lucide-react';

interface ResponsesSummaryButtonProps {
  onClick: () => void;
}

export function ResponsesSummaryButton({ onClick }: ResponsesSummaryButtonProps) {
  return (
    <Button variant="outline" size="sm" onClick={onClick} className="gap-2">
      <BarChart2 className="h-4 w-4" />
      Summary
    </Button>
  );
}