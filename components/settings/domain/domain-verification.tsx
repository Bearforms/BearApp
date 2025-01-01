'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

export function DomainVerification() {
  const handleVerify = () => {
    toast({ description: 'Domain verification started' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-medium">Domain Verification</h3>
        <p className="text-sm text-muted-foreground">
          Add these DNS records to verify your domain ownership
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-md bg-neutral-50 p-4">
          <h4 className="text-sm font-medium mb-2">DNS Configuration</h4>
          <div className="space-y-2 text-sm">
            <p>Add these records to your DNS settings:</p>
            <pre className="bg-neutral-100 p-3 rounded-md text-xs overflow-x-auto">
              CNAME forms.yourdomain.com forms.bearforms.com
            </pre>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">SSL Certificate</Label>
            <p className="text-sm text-muted-foreground">
              SSL certificates are automatically provisioned and renewed
            </p>
          </div>

          <Button onClick={handleVerify}>Verify Domain</Button>
        </div>
      </div>
    </div>
  );
}
