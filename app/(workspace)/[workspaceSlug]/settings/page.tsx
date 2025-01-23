import { SettingsHeader } from '@/components/settings/settings-header';
import { AccountSettings } from '@/components/settings/account/account-settings';
import { WorkspaceSettings } from '@/components/settings/workspace/workspace-settings';
import { DomainSettings } from '@/components/settings/domain/domain-settings';
import { BillingSettings } from '@/components/settings/billing/billing-settings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Building2, Globe, CreditCard } from 'lucide-react';
import { getUserWorkspaceBySlug } from '@/actions/workspaces/getUserWorkspaceBySlug';

export default async function SettingsPage({params}: {params: {workspaceSlug: string}}) {

  const workspace = await getUserWorkspaceBySlug(params.workspaceSlug);  

  return (
      <main className="flex-1 flex flex-col min-w-0">
        <SettingsHeader />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl mx-auto">
            <Tabs defaultValue="account" className="space-y-6">
              <TabsList>
                <TabsTrigger
                  value="account"
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" strokeWidth={2} />
                  Account
                </TabsTrigger>
                <TabsTrigger
                  value="workspace"
                  className="flex items-center gap-2"
                >
                  <Building2 className="h-4 w-4" strokeWidth={2} />
                  Workspace
                </TabsTrigger>
                <TabsTrigger value="domain" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" strokeWidth={2} />
                  Domain
                </TabsTrigger>
                <TabsTrigger
                  value="billing"
                  className="flex items-center gap-2"
                >
                  <CreditCard className="h-4 w-4" strokeWidth={2} />
                  Billing
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="account"
                className="mt-2 p-6 space-y-4 border border-neutral-200 rounded-md bg-white focus-visible:outline-none"
              >
                <AccountSettings />
              </TabsContent>

              <TabsContent
                value="workspace"
                className="mt-2 p-6 space-y-4 border border-neutral-200 rounded-md bg-white focus-visible:outline-none"
              >
                <WorkspaceSettings workspace={workspace} />
              </TabsContent>

              <TabsContent
                value="domain"
                className="mt-2 p-6 space-y-4 border border-neutral-200 rounded-md bg-white focus-visible:outline-none"
              >
                <DomainSettings />
              </TabsContent>

              <TabsContent
                value="billing"
                className="mt-2 p-6 space-y-4 border border-neutral-200 rounded-md bg-white focus-visible:outline-none"
              >
                <BillingSettings />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
  );
}
