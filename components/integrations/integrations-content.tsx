'use client';

import { useState } from 'react';
import { IntegrationsSearch } from './integrations-search';
import { ActiveIntegrations } from './active/active-integrations';
import { AvailableIntegrations } from './available/available-integrations';
import { useIntegrationsStore } from '@/stores/integrations-store';

interface IntegrationsContentProps {
  formId: string;
}

export function IntegrationsContent({ formId }: IntegrationsContentProps) {
  const [search, setSearch] = useState('');
  const { activeIntegrations, availableIntegrations } = useIntegrationsStore();

  const filteredActive = activeIntegrations.filter((integration) =>
    integration.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAvailable = availableIntegrations.filter((integration) =>
    integration.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full p-8 overflow-y-auto">
      <div className="space-y-6 w-full mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-3">
          <IntegrationsSearch value={search} onChange={setSearch} />
        </div>
        <div className="flex-col space-y-6">
          <ActiveIntegrations integrations={filteredActive} />
          <AvailableIntegrations integrations={filteredAvailable} />
        </div>
      </div>
    </div>
  );
}
