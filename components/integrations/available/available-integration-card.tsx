'use client';

import { Button } from '@/components/ui/button';
import { Integration } from '@/types/integration';
import { useIntegrationsStore } from '@/stores/integrations-store';
import { toast } from '@/hooks/use-toast';
import { IntegrationIcon } from '../shared/integration-icon';

interface AvailableIntegrationCardProps {
  integration: Integration;
}

export function AvailableIntegrationCard({
  integration,
}: AvailableIntegrationCardProps) {
  const { connectIntegration } = useIntegrationsStore();

  const handleConnect = () => {
    connectIntegration(integration.id);
    toast({ description: `${integration.name} connected successfully` });
  };

  return (
    <div className="bg-white rounded-md border border-neutral-200 hover:border-neutral-300 transition-colors p-4 space-y-4">
      <div className="flex flex-col gap-3">
        <IntegrationIcon integration={integration} />
        <div className="space-y-1">
          <h3 className="font-medium">{integration.name}</h3>
          <p className="text-sm text-neutral-500 line-clamp-2">
            {integration.description}
          </p>
        </div>
      </div>

      <Button variant="outline" onClick={handleConnect} className="w-full">
        Connect
      </Button>
    </div>
  );
}
