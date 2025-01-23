
"use server";

import { getCurrentUser } from '@/lib/session';
import { createAdminClient } from '@/supabase/admin';

export const updateWorkspaceMemberRole = async ({ workspaceId, memberId, role }: { workspaceId: string, memberId: string, role: string; }) => {
	const user = await getCurrentUser();
	if (!user) {
		throw new Error('User not authenticated');
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
		throw new Error('Cannot update owner role');
	}

	// update member role
	const { error: updateError, data } = await supabase.from('workspace_members').update({ role })
		.eq('workspace_id', workspaceId).eq('user_id', memberId).select('role, user_id').single();
	
	if (updateError) {
		throw new Error('Error updating member role');
	}

	return data
};