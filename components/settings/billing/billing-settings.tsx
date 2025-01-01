'use client';

import { BillingPlan } from './billing-plan';
import { PaymentMethod } from './payment-method';
import { BillingHistory } from './billing-history';
import { Separator } from '@/components/ui/separator';

export function BillingSettings() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-lg font-medium">Billing Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>

      <div>
        <BillingPlan />
      </div>

      <Separator />

      <div>
        <PaymentMethod />
      </div>

      <Separator />

      <div>
        <BillingHistory />
      </div>
    </div>
  );
}