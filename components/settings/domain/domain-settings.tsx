'use client';

import { DomainInfo } from './domain-info';
import { DomainVerification } from './domain-verification';
import { Separator } from '@/components/ui/separator';

export function DomainSettings() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-lg font-medium">Domain Settings</h2>
        <p className="text-sm text-muted-foreground">
          Configure your custom domain for form hosting
        </p>
      </div>

      <div>
        <DomainInfo />
      </div>

      <Separator />

      <div>
        <DomainVerification />
      </div>
    </div>
  );
}