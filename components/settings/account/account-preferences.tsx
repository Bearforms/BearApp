'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

// Dummy preferences data
const dummyPreferences = {
  emailNotifications: true,
  formSubmissionAlerts: true,
  weeklyDigest: false,
  theme: 'system',
  language: 'en'
};

export function AccountPreferences() {
  const [preferences, setPreferences] = useState(dummyPreferences);

  const handlePreferenceChange = (key: keyof typeof preferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    toast({ description: 'Preferences updated' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-medium">Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Customize your notification settings and preferences
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications about your forms
              </p>
            </div>
            <Switch
              checked={preferences.emailNotifications}
              onCheckedChange={(checked) => 
                handlePreferenceChange('emailNotifications', checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Form Submission Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when someone submits a form
              </p>
            </div>
            <Switch
              checked={preferences.formSubmissionAlerts}
              onCheckedChange={(checked) => 
                handlePreferenceChange('formSubmissionAlerts', checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Weekly Digest</Label>
              <p className="text-sm text-muted-foreground">
                Receive a weekly summary of form activities
              </p>
            </div>
            <Switch
              checked={preferences.weeklyDigest}
              onCheckedChange={(checked) => 
                handlePreferenceChange('weeklyDigest', checked)
              }
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Theme</Label>
            <Select
              value={preferences.theme}
              onValueChange={(value) => handlePreferenceChange('theme', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Language</Label>
            <Select
              value={preferences.language}
              onValueChange={(value) => handlePreferenceChange('language', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}