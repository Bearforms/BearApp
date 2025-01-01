'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Code } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface EmbedCodeProps {
  url: string;
  style: 'inline' | 'fullscreen' | 'modal';
  width?: string;
  height?: string;
  hideHeader?: boolean;
  allowFullscreen?: boolean;
}

export function EmbedCode({
  url,
  style,
  width = '100%',
  height = '500px',
  hideHeader = false,
  allowFullscreen = true,
}: EmbedCodeProps) {
  const getEmbedCode = () => {
    const params = new URLSearchParams();
    if (hideHeader) params.append('hideHeader', 'true');
    const queryString = params.toString() ? `?${params.toString()}` : '';

    switch (style) {
      case 'inline':
        return `<iframe
  src="${url}${queryString}"
  style="width: ${width}; height: ${height}; border: none;"
  ${allowFullscreen ? 'allowfullscreen' : ''}
></iframe>`;

      case 'fullscreen':
        return `<iframe
  src="${url}${queryString}"
  style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999; border: none;"
  ${allowFullscreen ? 'allowfullscreen' : ''}
></iframe>`;

      case 'modal':
        return `<script>
  function openFormModal() {
    const modal = document.createElement('div');
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 9999;';
    
    const iframe = document.createElement('iframe');
    iframe.src = '${url}${queryString}';
    iframe.style.cssText = 'width: 90%; max-width: 600px; height: 80vh; border: none; border-radius: 8px;';
    ${allowFullscreen ? 'iframe.allowFullscreen = true;' : ''}
    
    modal.onclick = (e) => {
      if (e.target === modal) document.body.removeChild(modal);
    };
    
    modal.appendChild(iframe);
    document.body.appendChild(modal);
  }
</script>
<button onclick="openFormModal()">Open Form</button>`;
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(getEmbedCode());
      toast({ description: 'Embed code copied to clipboard' });
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Please try again',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <pre className="p-4 bg-neutral-50 rounded-md text-sm overflow-x-auto">
          {getEmbedCode()}
        </pre>
        <Button
          size="sm"
          className="absolute top-2 right-2"
          onClick={handleCopyCode}
        >
          <Code className="h-4 w-4 mr-2" />
          Copy
        </Button>
      </div>
    </div>
  );
}