'use client';

import { ActiveIntegrationCard } from './active-integration-card';
import { Integration } from '@/types/integration';

interface ActiveIntegrationsProps {
  integrations: Integration[];
}

export function ActiveIntegrations({ integrations }: ActiveIntegrationsProps) {
  if (integrations.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-sm font-medium">Active Integrations</h2>
        <div className="bg-white rounded-md border-[0.5px] shadow-sm border-neutral-200 p-6 text-center">
          <p className="text-sm text-neutral-500">No active integrations</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium">Active Integrations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {integrations.map((integration) => (
          <ActiveIntegrationCard
            key={integration.id}
            integration={integration}
          />
        ))}
      </div>
    </div>
  );
}
