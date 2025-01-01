'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { X, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useShareUrl } from '@/hooks/use-share-url';
import { EmbedStyles } from './share/embed-styles';
import { EmbedCode } from './share/embed-code';
import { ShareLink } from './share/share-link';
import { EmbedOptions } from './share/embed-options';

interface ShareSettingsProps {
  formId: string;
  onClose: () => void;
}

export function ShareSettings({ formId, onClose }: ShareSettingsProps) {
  const { url, copyToClipboard } = useShareUrl(`/form/${formId}`);
  const [embedStyle, setEmbedStyle] = useState<'inline' | 'fullscreen' | 'modal'>('inline');
  const [embedSettings, setEmbedSettings] = useState({
    width: '100%',
    height: '500px',
    hideHeader: false,
    allowFullscreen: true,
  });

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between px-4 h-[52px] border-b border-neutral-100">
        <div className="text-base font-medium">Share form</div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-5 p-4">
        <ShareLink url={url} onCopy={copyToClipboard} />

        <div className="space-y-3">
          
          <EmbedStyles 
            value={embedStyle}
            onChange={setEmbedStyle}
          />

          <EmbedOptions
            style={embedStyle}
            settings={embedSettings}
            onSettingsChange={setEmbedSettings}
          />

          <div className="space-y-2">
            <Label className="font-normal">Embed code</Label>
            <EmbedCode
              url={url}
              style={embedStyle}
              {...embedSettings}
            />
          </div>
        </div>
      </div>
    </div>
  );
}