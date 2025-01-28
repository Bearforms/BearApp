'use client';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { FormSettings } from '@/types/form';
import { Textarea } from '@/components/ui/textarea';
import { useFormStore } from '@/stores/form-store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


interface GeneralSettingsProps {
  formId: string;
  onClose: () => void;
}

export function GeneralSettings({ formId, onClose }: GeneralSettingsProps) {

  const form = useFormStore((state) => state.form);
  const updateFormOnStore = useFormStore((state) => state.updateForm);

  const [settings, setSettings] = useState<FormSettings>({
    language: form?.formSettings?.language ?? 'english',
    showStepCount: form?.formSettings?.showStepCount ?? false,
    recapture: form?.formSettings?.recapture ?? false,
    requireLogin: form?.formSettings?.requireLogin ?? false,
    loginPassword: form?.formSettings?.loginPassword ?? '',
    enableReview: form?.formSettings?.enableReview ?? false,
    stopResponses: form?.formSettings?.stopResponses ?? false,
    enableResponseLimit: form?.formSettings?.enableResponseLimit ?? false,
    responseLimit: form?.formSettings?.responseLimit ?? '',
    expiryDate: form?.formSettings?.expiryDate ?? '',
    enableCloseFormMessage: form?.formSettings?.enableCloseFormMessage ?? false,
    closeFormMessage: form?.formSettings?.closeFormMessage ?? '',
  });

  const handleSettingChange = (key: keyof FormSettings, value: any) => {
    setSettings({ ...settings, [key]: value });

    updateFormOnStore(formId, { formSettings: { ...settings, [key]: value } });
  };

  return (
    <div className="h-full flex flex-col bg-white space-y-6 pl-0.5">
      <div className="space-y-4">
        <div className="space-y-0.5">
          <Label className="font-normal text-neutral-800 text-sm">Language</Label>
          <p className="text-sm leading-5 text-muted-foreground">
            Show steps progress for multi-step forms
          </p>
          <Select>

          </Select>
          <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
            <SelectTrigger className='max-w-max '>
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between space-x-3">
          <div className="space-y-0.5">
            <Label className="font-normal text-neutral-800 text-sm">Show step count</Label>
            <p className="text-sm leading-5 text-muted-foreground">
              Show steps progress for multi-step forms
            </p>
          </div>
          <Switch
            checked={settings.showStepCount}
            onCheckedChange={(checked) => handleSettingChange('showStepCount', checked)}
          />
        </div>

        <div className="flex items-center justify-between space-x-3">
          <div className="space-y-0.5">
            <Label className="font-normal text-neutral-800 text-sm">Recapture</Label>
            <p className="text-sm leading-5 text-muted-foreground">
              Prevent bot responses
            </p>
          </div>
          <Switch
            checked={settings.recapture}
            onCheckedChange={(checked) => handleSettingChange('recapture', checked)}
          />
        </div>
      </div>
      <Separator />

      <div className="space-y-4">
        <h3 className="text-[14px] font-medium">Responses</h3>

        <div>
          <div className="flex items-center justify-between space-x-3">
            <div className="space-y-0.5">
              <Label className="font-normal">Require login</Label>
              <p className="text-sm text-muted-foreground">
                Require users to login before submitting
              </p>
            </div>
            <Switch
              checked={settings.requireLogin}
              onCheckedChange={(checked) => handleSettingChange('requireLogin', checked)}
            />
          </div>
          {settings.requireLogin && (
            <Input
              placeholder="45679089"
              value={settings.loginPassword}
              className='mt-3'
              onChange={(e) => handleSettingChange('loginPassword', e.target.value)}
            />
          )}
        </div>

        <div className="flex items-center justify-between space-x-3">
          <div className="space-y-0.5">
            <Label className="font-normal">Enable responses review</Label>
            <p className="text-sm text-muted-foreground">
              Allow users to review their responses before submitting
            </p>
          </div>
          <Switch
            checked={settings.enableReview}
            onCheckedChange={(checked) => handleSettingChange('enableReview', checked)}
          />
        </div>

        <div className="flex items-center justify-between space-x-3">
          <div className="space-y-0.5">
            <Label className="font-normal">Stop responses</Label>
            <p className="text-sm text-muted-foreground">
              Close the form to stop receiving responses
            </p>
          </div>
          <Switch
            checked={settings.stopResponses}
            onCheckedChange={(checked) => handleSettingChange('stopResponses', checked)}
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
            onChange={(e) => handleSettingChange('responseLimit', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <div className="space-y-0.5">
            <Label className="font-normal">Expiry date</Label>
            <p className="text-sm text-muted-foreground">
              Date after which the form will stop receiving responses
            </p>
          </div>
          <Input
            type="date"
            value={settings.expiryDate}
            onChange={(e) => handleSettingChange('expiryDate', e.target.value)}
          />
        </div>

        <div>
          <div className="flex items-center justify-between space-x-3">
            <div className="space-y-0.5">
              <Label className="font-normal">Close form message</Label>
              <p className="text-sm text-muted-foreground">
                This message will be shown when you access closed forms that cannot accept responses
              </p>
            </div>
            <Switch
              checked={settings.enableCloseFormMessage}
              onCheckedChange={(checked) => handleSettingChange('enableCloseFormMessage', checked)}
            />
          </div>
          {settings.enableCloseFormMessage && (
            <Textarea
              placeholder="This form is no longer accepting responses"
              value={settings.closeFormMessage}
              className='mt-3'
              onChange={(e) => handleSettingChange('closeFormMessage', e.target.value)}
            />
          )}
        </div>

      </div>
    </div>
  );
}
