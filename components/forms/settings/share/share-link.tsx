'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ShareLinkProps {
  url: string;
  onCopy: () => Promise<boolean>;
}

export function ShareLink({ url, onCopy }: ShareLinkProps) {
  const handleCopyLink = async () => {
    const success = await onCopy();
    if (success) {
      toast({ description: 'Link copied to clipboard' });
    } else {
      toast({
        title: 'Failed to copy',
        description: 'Please try again',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-2">
      <Label className="font-medium">Share link</Label>
      <div className="flex gap-2">
        <Input value={url} readOnly className="flex-1" />
        <Button
          className="h-10 w-10"
          variant="outline"
          size="icon"
          onClick={handleCopyLink}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
