'use client';

import { Button } from '@/components/ui/button';
import { Integration } from '@/types/integration';
import { formatDistanceToNow } from 'date-fns';
import { useIntegrationsStore } from '@/stores/integrations-store';
import { toast } from '@/hooks/use-toast';
import { IntegrationIcon } from '../shared/integration-icon';
import { Settings2 } from 'lucide-react';

interface ActiveIntegrationCardProps {
  integration: Integration;
}

export function ActiveIntegrationCard({
  integration,
}: ActiveIntegrationCardProps) {
  const { disconnectIntegration } = useIntegrationsStore();

  const handleDisconnect = () => {
    disconnectIntegration(integration.id);
    toast({ description: `${integration.name} disconnected successfully` });
  };

  const lastSyncedDate = integration.lastSynced
    ? new Date(integration.lastSynced)
    : new Date();

  return (
    <div className="bg-white rounded-md border border-neutral-200 hover:border-neutral-300 transition-colors p-4 space-y-4">
      <div className="flex flex-col gap-3">
        <IntegrationIcon integration={integration} />
        <div className="space-y-1">
          <h3 className="font-medium">{integration.name}</h3>
          <p className="text-xs text-muted-foreground">Connected</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-neutral-500 line-clamp-2">
          {integration.description}
        </p>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDisconnect}
            className="w-full text-red-600 hover:text-red-700"
          >
            Disconnect
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
