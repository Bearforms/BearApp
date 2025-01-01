'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { format } from 'date-fns';

// Dummy billing history data
const billingHistory = [
  {
    id: 'INV-001',
    date: '2024-01-15',
    amount: '$12.00',
    status: 'Paid',
    downloadUrl: '#'
  },
  {
    id: 'INV-002',
    date: '2023-12-15',
    amount: '$12.00',
    status: 'Paid',
    downloadUrl: '#'
  }
];

export function BillingHistory() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-medium">Billing History</h3>
        <p className="text-sm text-muted-foreground">
          View and download your past invoices
        </p>
      </div>

      <div className="rounded-md border">
        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr className="text-sm text-muted-foreground">
                <th className="text-left font-medium">Invoice</th>
                <th className="text-left font-medium">Date</th>
                <th className="text-left font-medium">Amount</th>
                <th className="text-left font-medium">Status</th>
                <th className="text-right font-medium">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {billingHistory.map((invoice) => (
                <tr key={invoice.id} className="text-sm">
                  <td className="py-4">{invoice.id}</td>
                  <td className="py-4">
                    {format(new Date(invoice.date), 'MMM d, yyyy')}
                  </td>
                  <td className="py-4">{invoice.amount}</td>
                  <td className="py-4">{invoice.status}</td>
                  <td className="py-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      asChild
                    >
                      <a href={invoice.downloadUrl} download>
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}