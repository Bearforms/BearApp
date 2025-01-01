import { Integration } from '@/types/integration';

export const integrationsList: Integration[] = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get form submissions directly in your Slack channels',
    iconName: 'Slack',
    features: ['Real-time notifications', 'Custom channel routing', 'Rich message formatting']
  },
  {
    id: 'airtable',
    name: 'Airtable',
    description: 'Sync form responses to Airtable bases automatically',
    iconName: 'Database',
    features: ['Automatic syncing', 'Custom field mapping', 'Multiple base support']
  },
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    description: 'Export form responses directly to Google Sheets',
    iconName: 'Sheet',
    features: ['Auto-export', 'Custom column mapping', 'Multiple sheet support']
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Add form respondents to your Mailchimp lists',
    iconName: 'Mail',
    features: ['List management', 'Tag support', 'Custom fields']
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Send form submissions to Discord channels',
    iconName: 'MessageSquare',
    features: ['Instant notifications', 'Custom webhooks', 'Rich embeds']
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect your forms to 3000+ apps with Zapier',
    iconName: 'Webhook',
    features: ['Custom workflows', 'Multi-step zaps', 'Conditional logic']
  },
  {
    id: 'make',
    name: 'Make (Integromat)',
    description: 'Create complex automation workflows',
    iconName: 'BrainCircuit',
    features: ['Visual builder', 'Complex scenarios', 'Data transformation']
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Save form responses to Notion databases',
    iconName: 'FileSpreadsheet',
    features: ['Database sync', 'Page creation', 'Property mapping']
  },
  {
    id: 'trello',
    name: 'Trello',
    description: 'Create Trello cards from form submissions',
    iconName: 'Trello',
    features: ['Card creation', 'List automation', 'Label support']
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Sync form data with your HubSpot CRM',
    iconName: 'Boxes',
    features: ['Contact creation', 'Deal pipeline', 'Custom properties']
  }
];