'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Integration } from '@/types/integration';
import { integrationsList } from '@/lib/constants/integrations';

interface IntegrationsState {
  activeIntegrations: Integration[];
  availableIntegrations: Integration[];
  connectIntegration: (id: string) => void;
  disconnectIntegration: (id: string) => void;
}

export const useIntegrationsStore = create<IntegrationsState>()(
  persist(
    (set, get) => ({
      activeIntegrations: [],
      availableIntegrations: integrationsList,
      connectIntegration: (id) => {
        const integration = get().availableIntegrations.find(i => i.id === id);
        if (!integration) return;

        const now = new Date().toISOString();
        
        set((state) => ({
          activeIntegrations: [...state.activeIntegrations, {
            ...integration,
            lastSynced: now,
            stats: {
              formsSynced: 0,
              responsesSynced: 0
            }
          }],
          availableIntegrations: state.availableIntegrations.filter(i => i.id !== id)
        }));
      },
      disconnectIntegration: (id) => {
        const integration = get().activeIntegrations.find(i => i.id === id);
        if (!integration) return;

        // Remove lastSynced and stats before moving back to available
        const { lastSynced, stats, ...cleanIntegration } = integration;
        
        set((state) => ({
          activeIntegrations: state.activeIntegrations.filter(i => i.id !== id),
          availableIntegrations: [...state.availableIntegrations, cleanIntegration].sort((a, b) => a.name.localeCompare(b.name))
        }));
      }
    }),
    {
      name: 'integrations-storage',
      version: 1
    }
  )
);