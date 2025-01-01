'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    interval: 'forever',
    features: [
      '3 forms',
      '100 responses/month',
      'Basic analytics',
      'Email support'
    ],
    current: true
  },
  {
    name: 'Pro',
    price: '$12',
    interval: 'per month',
    features: [
      'Unlimited forms',
      'Unlimited responses',
      'Advanced analytics',
      'Priority support',
      'Custom domains',
      'Team collaboration'
    ]
  }
];

export function BillingPlan() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-medium">Current Plan</h3>
        <p className="text-sm text-muted-foreground">
          Choose the best plan for your needs
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="relative rounded-md border p-6 shadow-sm"
          >
            {plan.current && (
              <Badge
                variant="secondary"
                className="absolute -top-2 right-4"
              >
                Current Plan
              </Badge>
            )}
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium">{plan.name}</h4>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">/{plan.interval}</span>
                </div>
              </div>

              <ul className="space-y-2.5">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" strokeWidth={3} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.current ? 'outline' : 'default'}
                className="w-full"
              >
                {plan.current ? 'Current Plan' : 'Upgrade'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}