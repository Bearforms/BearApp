'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { useState } from 'react';

interface GeneralSettingsProps {
  formId: string;
  onClose: () => void;
}

export function GeneralSettings({ formId, onClose }: GeneralSettingsProps) {
  const [settings, setSettings] = useState({
    allowAnonymous: true,
    requireLogin: false,
    collectEmail: true,
    responseLimit: '',
    expiryDate: '',
    enableReview: false,
  });

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between px-4 h-[52px] border-b border-neutral-100">
        <div className="text-base font-medium">Form settings</div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-[14px] font-medium">Response collection</h3>

            <div className="flex items-center justify-between space-x-3">
              <div className="space-y-0.5">
                <Label className="font-normal">Allow anonymous responses</Label>
                <p className="text-sm text-muted-foreground">
                  Let users submit without identifying themselves
                </p>
              </div>
              <Switch
                checked={settings.allowAnonymous}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, allowAnonymous: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between space-x-3">
              <div className="space-y-0.5">
                <Label className="font-normal">Require login</Label>
                <p className="text-sm text-muted-foreground">
                  Users must be logged in to submit
                </p>
              </div>
              <Switch
                checked={settings.requireLogin}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, requireLogin: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between space-x-3">
              <div className="space-y-0.5">
                <Label className="font-normal">Collect email addresses</Label>
                <p className="text-sm text-muted-foreground">
                  Request email before form submission
                </p>
              </div>
              <Switch
                checked={settings.collectEmail}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, collectEmail: checked })
                }
              />
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h3 className="text-[14px] font-medium">Submission settings</h3>

            <div className="flex items-center justify-between space-x-3">
              <div className="space-y-0.5">
                <Label className="font-normal">Enable response review</Label>
                <p className="text-sm text-muted-foreground">
                  Allow users to review their responses before submitting
                </p>
              </div>
              <Switch
                checked={settings.enableReview}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, enableReview: checked })
                }
              />
            </div>

            <div className="space-y-2">
              <div className="space-y-0.5">
                <Label className="font-normal">Response limit</Label>
                <p className="text-xs text-muted-foreground">
                  Maximum number of responses to collect
                </p>
              </div>
              <Input
                type="number"
                placeholder="Unlimited"
                value={settings.responseLimit}
                onChange={(e) =>
                  setSettings({ ...settings, responseLimit: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <div className="space-y-0.5">
                <Label className="font-normal">Expiry date</Label>
                <p className="text-sm text-muted-foreground">
                  Date after which the form will stop accepting responses
                </p>
              </div>
              <Input
                type="date"
                value={settings.expiryDate}
                onChange={(e) =>
                  setSettings({ ...settings, expiryDate: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
