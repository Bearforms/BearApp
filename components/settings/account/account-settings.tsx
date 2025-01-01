'use client';

import { AccountInfo } from './account-info';
import { AccountPreferences } from './account-preferences';
import { AccountSecurity } from './account-security';
import { Separator } from '@/components/ui/separator';

export function AccountSettings() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-lg font-medium">Account Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      <div>
        <AccountInfo />
      </div>

      <Separator />

      <div>
        <AccountPreferences />
      </div>

      <Separator />

      <div>
        <AccountSecurity />
      </div>
    </div>
  );
}