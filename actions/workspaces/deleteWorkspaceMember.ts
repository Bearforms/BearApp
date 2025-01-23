
"use server";

import { getCurrentUser } from '@/lib/session';
import { createAdminClient } from '@/supabase/admin';

export const deleteWorkspaceMember = async ({ workspaceId, memberId }: { workspaceId: string, memberId: string }) => {
	const user = await getCurrentUser();
	if (!user) {
		throw new Error('User not authenticated');
	}

	if (user.id === memberId) {
		throw new Error('Cannot delete yourself');
	}

	const supabase = await createAdminClient();	

	// check if workspace exists
	const { data: existingWorkspace } = await supabase.from('workspaces').select('id').eq('id', workspaceId).single();
	if (!existingWorkspace) {
		throw new Error('Workspace not found');
	}

	// check if user exists
	const { data: existingUser } = await supabase.from('profiles').select('id').eq('id', memberId).single();

	if (!existingUser) {
		throw new Error('User not found');
	}

	// check existing member
	const { data: existingMember, error } = await supabase.from('workspace_members').select('role').eq('workspace_id', workspaceId).eq('user_id', memberId).single();
	
	if (!existingMember) {
		throw new Error('Workspace member not found');
	}

	if (existingMember.role === "owner") { 
		throw new Error('Cannot delete workspace owner');
	}

	const { error: updateError, data } = await supabase.from('workspace_members').delete()
		.eq('workspace_id', workspaceId).eq('user_id', memberId).select('role, user_id').single();
	
	if (updateError) {
		throw new Error('Error deleting member role');
	}
	
	return data
};