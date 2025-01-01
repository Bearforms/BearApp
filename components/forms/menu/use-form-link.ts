'use client';

import { toast } from '@/hooks/use-toast';

export function useFormLink(formId: string) {
  const handleCopyLink = async () => {
    try {
      const formUrl = `${window.location.origin}/form/${formId}`;
      await navigator.clipboard.writeText(formUrl);
      toast({ description: 'Form link copied to clipboard' });
    } catch (error) {
      toast({ 
        title: 'Error',
        description: 'Failed to copy link',
        variant: 'destructive'
      });
    }
  };

  return { handleCopyLink };
}