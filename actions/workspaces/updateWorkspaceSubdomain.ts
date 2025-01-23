
"use server";

import { getCurrentUser } from '@/lib/session';
import { createAdminClient } from '@/supabase/admin';
import { revalidatePath } from 'next/cache';

export const updateWorkspaceSubdomain = async ({ workspaceId, subdomain }: { workspaceId: string, subdomain: string; }) => {
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

	// check if subdomain exists
	const { data: existingSubdomain } = await supabase.from('workspaces').select('id').eq('subdomain', subdomain).neq('id', workspaceId).single();
	if (existingSubdomain) {
		throw new Error('Subdomain already taken');
	}

	// update member role
	const { error: updateError, data } = await supabase.from('workspaces').update({ subdomain }).eq('id', workspaceId).single();
	
	if (updateError) {
		throw new Error('Error updating subdomain');
	}

	revalidatePath(`/app/${workspaceId}/settings`);
	return data
};