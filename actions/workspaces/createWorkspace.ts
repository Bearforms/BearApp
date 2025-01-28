
"use server";

import { getCurrentUser } from '@/lib/session';
import { createAdminClient } from '@/supabase/admin';
import { createClient } from '@/supabase/server';
import { revalidatePath } from 'next/cache';

export const createWorkspace = async (name: string) => {
	const user = await getCurrentUser();
	if (!user) {
		throw new Error('User not authenticated');
	}

	const [supabase, supabaseAdmin] = await Promise.all([createClient(), createAdminClient()]);

	const workspaceSlugBase = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
	let workspaceSlug = workspaceSlugBase + (workspaceSlugBase?.endsWith('workspace') ? '' : '-workspace');

	// check if slug exists
	const { data: existingWorkspace } = await supabase.from('workspaces').select('id').eq('slug', workspaceSlug).single();
	if (existingWorkspace) {
		workspaceSlug = workspaceSlugBase + '-' + Math.floor(Math.random() * 100000) + (workspaceSlugBase?.endsWith('workspace') ? '' : '-workspace');
	}

	const { data: workspaceData, error: workspaceError } = await supabaseAdmin.from('workspaces').insert({
		name,
		owner_id: user.id,
		slug: workspaceSlug,
		subdomain: workspaceSlug,
		is_public: false,
		description: null,
		updated_by: user.id,
	}).select().single();

	if (workspaceError) {
		console.log('Workspace error:', workspaceError.message);

		throw workspaceError;
	}

	const { error: memberError } = await supabaseAdmin.from('workspace_members').insert({
		workspace_id: workspaceData?.id,
		user_id: user.id,
		role: 'owner',
		added_by: user.id,
	});

	if (memberError) {
		console.log('Workspace member error:', memberError.message);
		await supabase.from('workspaces').delete().match({ id: workspaceData.id });
		throw memberError;
	}

	revalidatePath('/app/[workspaceSlug]', 'page');
	return workspaceData;
};