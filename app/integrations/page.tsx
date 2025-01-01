'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { IntegrationsHeader } from '@/components/integrations/integrations-header';
import { IntegrationsSearch } from '@/components/integrations/integrations-search';
import { ActiveIntegrations } from '@/components/integrations/active/active-integrations';
import { AvailableIntegrations } from '@/components/integrations/available/available-integrations';
import { useIntegrationsStore } from '@/stores/integrations-store';

export default function IntegrationsPage() {
  const [search, setSearch] = useState('');
  const { activeIntegrations, availableIntegrations } = useIntegrationsStore();

  const filteredActive = activeIntegrations.filter((integration) =>
    integration.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAvailable = availableIntegrations.filter((integration) =>
    integration.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <IntegrationsHeader />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-3">
              <IntegrationsSearch value={search} onChange={setSearch} />
            </div>

            <ActiveIntegrations integrations={filteredActive} />

            <div className="h-px bg-neutral-200" />

            <AvailableIntegrations integrations={filteredAvailable} />
          </div>
        </div>
      </main>
    </div>
  );
}
