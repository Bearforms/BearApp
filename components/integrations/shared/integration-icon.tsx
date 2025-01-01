'use client';

import { Integration } from '@/types/integration';
import * as Icons from 'lucide-react';

interface IntegrationIconProps {
  integration: Integration;
  className?: string;
}

export function IntegrationIcon({ integration, className = "h-5 w-5 text-neutral-500" }: IntegrationIconProps) {
  const Icon = Icons[integration.iconName as keyof typeof Icons];

  return (
    <div className="h-10 w-10 rounded-md bg-neutral-100 flex items-center justify-center">
      {Icon && <Icon className={className} strokeWidth={1.5} />}
    </div>
  );
}