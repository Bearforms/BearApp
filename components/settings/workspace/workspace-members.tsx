'use client';

import { useMemo, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { Plus, MoreHorizontal, Mail, AlertCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Workspace } from '@/types/supabase';
import { useMutation } from '@tanstack/react-query';
import { addWorkspaceMember } from '@/actions/workspaces/addWorkspaceMember';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { updateWorkspaceMemberRole } from '@/actions/workspaces/updateWorkspaceMemberRole';
import { useSession } from '@/hooks/use-session';
import { deleteWorkspaceMember } from '@/actions/workspaces/deleteWorkspaceMember';

interface WorkspaceMembersProps {
  workspace: Workspace;
}

export function WorkspaceMembers({ workspace }: WorkspaceMembersProps) {
  const [members, setMembers] = useState(workspace.members || []);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');

  const [addMemberError, setAddMemberError] = useState<string | null>(null);
  const { user } = useSession();

  const { mutate, isPending: isPendingInvite } = useMutation({
    mutationFn: addWorkspaceMember,
    onError: (error) => {
      setAddMemberError(error.message);
    },
    onSuccess: () => {
      setShowInviteDialog(false);
      toast({ description: 'Member invited to workspace' });
    }
  });

  const { mutate: mutateChangeRole, isPending: isPendingChangeRole } = useMutation({
    mutationFn: updateWorkspaceMemberRole,
    onError: (error) => {
      toast({ description: error.message, variant: 'destructive', title: 'Failed' });
    },
    onSuccess: (data) => {
      toast({ description: 'Member role updated successfully!' });
      setMembers((prev) => prev.map((m) => m.user_id === data.user_id ? { ...m, role: data.role } : m));
    }
  });

  const { mutate: mutateDelete, isPending: isPendingDelete } = useMutation({
    mutationFn: deleteWorkspaceMember,
    onError: (error) => {
      toast({ description: error.message, variant: 'destructive', title: 'Failed' });
    },
    onSuccess: (data) => {
      console.log(data);
      
      toast({ description: 'Member deleted successfully!' });
      setMembers((prev) => prev.filter((m) => m.user_id !== data.user_id));
    }
  });

  const handleInvite = () => {
    setAddMemberError(null);
    mutate({ workspaceId: workspace.id, email: inviteEmail, role: inviteRole });
  };

  const handleRemoveMember = (id: string) => {
    toast({ description: 'Member removed from workspace' });
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedMembers(checked ? members.map((m) => m.user_id) : []);
  };

  const handleSelectMember = (id: string, checked: boolean) => {
    setSelectedMembers((prev) =>
      checked ? [...prev, id] : prev.filter((m) => m !== id)
    );
  };

  const canEditMembers = useMemo(() => {
    if (workspace.owner_id === user?.id) return true;

    const member = members.find((m) => m.user_id === user?.id);
    if (!member) return false;

    return member.role === 'owner' || member.role === 'admin';
  }, [workspace.owner_id, user?.id, members]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-base font-medium">Members</h3>
          <p className="text-sm text-muted-foreground">
            Manage workspace members and their roles
          </p>
        </div>
        <Button onClick={() => setShowInviteDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Invite
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedMembers.length === members.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.user_id}>
                <TableCell>
                  <Checkbox
                    checked={selectedMembers.includes(member.user_id)}
                    onCheckedChange={(checked) =>
                      handleSelectMember(member.user_id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.profile?.avatar_url || undefined} />
                      <AvatarFallback>
                        {`${member.profile?.first_name ?? ""} ${member.profile?.last_name ?? ""}`
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{`${member.profile?.first_name ?? ""} ${member.profile?.last_name ?? ""}`}</div>
                      <div className="text-sm text-muted-foreground">
                        {member.profile?.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Select
                    value={member.role}
                    disabled={
                      member.user_id === workspace.owner_id
                      || member.user_id === user?.id
                      || member.role === 'owner'
                      || isPendingChangeRole
                      || !canEditMembers
                    }

                    onValueChange={(value) =>
                      mutateChangeRole({
                        workspaceId: workspace.id,
                        memberId: member.user_id,
                        role: value as string,
                      })
                    }
                  >
                    <SelectTrigger className="w-[110px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        member.role === 'owner' && (
                          <SelectItem value="owner">Owner</SelectItem>
                        )
                      }
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        disabled={
                          member.user_id === workspace.owner_id
                          || member.user_id === user?.id
                          || member.role === 'owner'
                          || isPendingDelete
                          || !canEditMembers
                        }
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 disabled:cursor-not-allowed"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          mutateDelete({
                            workspaceId: workspace.id,
                            memberId: member.user_id,
                          });
                        }}
                        className="text-red-600"
                      >
                        Remove member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="w-full sm:w-[480px]">
          <DialogHeader>
            <DialogTitle>Invite Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {
              !!addMemberError && (
                <Alert variant="destructive" className='mb-4'>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Failed</AlertTitle>
                  <AlertDescription>
                    {addMemberError}
                  </AlertDescription>
                </Alert>
              )
            }

            <div className="space-y-2">
              <Label>Email Address</Label>
              <div className="flex gap-2">
                <Input
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="Enter email address"
                  type="email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger className="w-[110px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowInviteDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleInvite} disabled={!inviteEmail || isPendingInvite}>
              <Mail className="h-4 w-4 mr-2" />
              Send Invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
