
"use server";

import { getCurrentUser } from '@/lib/session';
import { createAdminClient } from '@/supabase/admin';
import { createClient } from '@/supabase/server';
import { revalidatePath } from 'next/cache';

export const updateWorkspace = async ({ workspaceId, name, description }:{workspaceId: string, name: string, description: string}) => {
	const user = await getCurrentUser();
	if (!user) {
		throw new Error('User not authenticated');
	}

	const supabase = await createClient();

	const workspaceSlugBase = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
	let workspaceSlug = workspaceSlugBase + (workspaceSlugBase?.endsWith('workspace') ? '' : '-workspace');

	// check if slug exists
	const { data: existingWorkspace } = await supabase.from('workspaces').select('id').eq('id', workspaceId).single();
	if (!existingWorkspace) {
		throw new Error('Workspace not found');
	}

	const { data: workspaceData, error: workspaceError } = await supabase.from('workspaces').update({
		name,
		slug: workspaceSlug,
		description,
		updated_by: user.id,
		updated_at: new Date().toISOString()
	}).eq('id', workspaceId).select().single();

	if (workspaceError) {
		console.log('Update workspace error:', workspaceError.message);
		throw workspaceError;
	}

	revalidatePath('/public/workspaces/[workspaceSlug]/settings', 'page');
	return workspaceData;
};