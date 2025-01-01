'use client';

import { AvailableIntegrationCard } from './available-integration-card';
import { Integration } from '@/types/integration';

interface AvailableIntegrationsProps {
  integrations: Integration[];
}

export function AvailableIntegrations({
  integrations,
}: AvailableIntegrationsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium">Available Integrations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {integrations.map((integration) => (
          <AvailableIntegrationCard
            key={integration.id}
            integration={integration}
          />
        ))}
      </div>
    </div>
  );
}
