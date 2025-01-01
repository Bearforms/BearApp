import { LucideIcon } from 'lucide-react';

export interface Integration {
  id: string;
  name: string;
  description: string;
  iconName: string; // Name of the Lucide icon
  features: string[];
  lastSynced?: string;
  stats?: {
    formsSynced: number;
    responsesSynced: number;
  };
}