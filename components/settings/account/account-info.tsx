'use client';

import { useState } from 'react';
import { AvatarUpload } from './avatar-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

// Dummy user data
const dummyUser = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://github.com/shadcn.png'
};

export function AccountInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(dummyUser.name);
  const [email, setEmail] = useState(dummyUser.email);
  const [avatar, setAvatar] = useState(dummyUser.avatar);

  const handleSave = () => {
    // In a real app, this would make an API call
    setIsEditing(false);
    toast({ description: 'Account information updated' });
  };

  const handleAvatarChange = (newAvatar: string) => {
    setAvatar(newAvatar);
    toast({ description: 'Profile picture updated' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-medium">Personal Information</h3>
        <p className="text-sm text-muted-foreground">
          Update your personal details and profile picture
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <AvatarUpload
            currentAvatar={avatar}
            onAvatarChange={handleAvatarChange}
          />
          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-medium">Profile Picture</h4>
            <p className="text-sm text-muted-foreground">
              Upload a new profile picture or remove the current one
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            {isEditing ? (
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="max-w-md"
              />
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-sm">{name}</p>
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Email Address</Label>
            {isEditing ? (
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="max-w-md"
              />
            ) : (
              <p className="text-sm">{email}</p>
            )}
          </div>

          {isEditing && (
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave}>Save Changes</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}