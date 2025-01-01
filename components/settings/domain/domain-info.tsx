'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

// Dummy domain data
const dummyDomain = {
  current: 'forms.example.com',
  status: 'active',
  lastVerified: '2024-01-15T10:30:00Z'
};

export function DomainInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [domain, setDomain] = useState(dummyDomain.current);

  const handleSave = () => {
    // In a real app, this would make an API call
    setIsEditing(false);
    toast({ description: 'Domain settings updated' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-medium">Domain Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Set up a custom domain for your forms
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Current Domain</Badge>
          <span className="text-sm">{dummyDomain.current}</span>
          <Badge variant="outline" className="ml-2">
            {dummyDomain.status}
          </Badge>
        </div>

        <div className="space-y-2">
          {isEditing ? (
            <>
              <Label>Custom Domain</Label>
              <div className="flex gap-2">
                <Input
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="forms.yourdomain.com"
                  className="max-w-md"
                />
                <Button onClick={handleSave}>Save</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Change Domain
            </Button>
          )}
          <p className="text-sm text-muted-foreground">
            Enter the domain where you want to host your forms
          </p>
        </div>
      </div>
    </div>
  );
}