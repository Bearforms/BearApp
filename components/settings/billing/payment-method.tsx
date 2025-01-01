'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { CreditCard } from 'lucide-react';

export function PaymentMethod() {
  const [isAdding, setIsAdding] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would handle payment processing
    toast({ description: 'Payment method added successfully' });
    setIsAdding(false);
    setCardNumber('');
    setExpiryDate('');
    setCvc('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-medium">Payment Method</h3>
        <p className="text-sm text-muted-foreground">
          Add or update your payment information
        </p>
      </div>

      {isAdding ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Card Number</Label>
            <Input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="grid gap-4 max-w-md sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Expiry Date</Label>
              <Input
                type="text"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>CVC</Label>
              <Input
                type="text"
                placeholder="123"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit">Add Card</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="rounded-md border p-6 max-w-md">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No payment method added</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsAdding(true)}
            className="mt-4"
          >
            Add Payment Method
          </Button>
        </div>
      )}
    </div>
  );
}