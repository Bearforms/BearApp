'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Workspace } from '@/types/supabase';
import { updateWorkspaceSubdomain } from '@/actions/workspaces/updateWorkspaceSubdomain';
import { useMutation } from '@tanstack/react-query';
import { useSession } from '@/hooks/use-session';


interface DomainInfoProps {
  workspace: Workspace;
}

export function DomainInfo({ workspace }: DomainInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [domain, setDomain] = useState("");
  const [subdomain, setSubdomain] = useState(workspace.subdomain ?? "");

  const { user } = useSession();

  const { mutate: mutateUpdateSubdomain, isPending: isPendingUpdateSubdomain } = useMutation({
    mutationFn: updateWorkspaceSubdomain,
    onError: (error) => {
      toast({ description: error.message, variant: 'destructive', title: 'Failed' });
    },
    onSuccess: (data) => {
      console.log(data);
      toast({ description: 'Workspace domain updated successfully!' });
    }
  });

  const handleSave = () => {
    // In a real app, this would make an API call
    setIsEditing(false);
    toast({ description: 'Domain settings updated' });
  };

  console.log(workspace);


  const userMember = workspace.members?.find((member) => member.user_id === user?.id);
  const canUpdateSubdomain = user?.id === workspace.owner_id || userMember?.role === 'admin' || userMember?.role === 'owner';

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-medium">Bearforms.com domain</h3>

        <div className="mt-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border px-3 rounded-md">
              <Input
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
                placeholder="forms"
                disabled={isPendingUpdateSubdomain || !canUpdateSubdomain}
                className='w-full max-w-[80px] border-none p-0'
              />
              {/* <span>{workspace.slug}</span> */}
              <span className="text-sm">.bearforms.com</span>
            </div>

            {
              workspace?.subdomain !== subdomain && subdomain.length >= 3 && (
                <Button
                  onClick={() => {
                    // Must be alphanumeric (A-Z, 0-9) with dashes between words.
                    const subdomainRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
                    if (!subdomainRegex.test(subdomain)) {
                      toast({ description: 'Subdomain must be alphanumeric with dashes between words', variant: 'destructive' });
                      return;
                    }
                    mutateUpdateSubdomain({ workspaceId: workspace.id, subdomain });
                  }}
                  disabled={isPendingUpdateSubdomain || !canUpdateSubdomain}
                >Save</Button>
              )
            }

          </div>
          <p className='text-xs leading-4 font-normal text-neutral-500 mt-1'>
            Must be alphanumeric (A-Z, 0-9) with dashes between words.
          </p>
        </div>
      </div>

      <div className="space-y-4">

        <div className="space-y-2">
          <Label>Custom Domain</Label>
          <div className="flex gap-2">
            <Input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter domain name"
            />
            <Button onClick={handleSave}>Add domain </Button>
          </div>
        </div>
      </div>
    </div>
  );
}