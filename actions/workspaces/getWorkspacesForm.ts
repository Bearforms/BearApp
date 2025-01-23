
"use server";

import { getCurrentUser } from '@/lib/session';
import { createClient } from '@/supabase/server';

export const getWorkspacesForm = async ({workspaceSlug, formId}: {workspaceSlug: string, formId: string}) => {
	const user = await getCurrentUser();
	if (!user) {
		throw new Error('User not authenticated');
	}
	const supabase = await createClient();

	const { data: existingWorkspace } = await supabase.from('workspaces').select('id').eq('slug', workspaceSlug).single();
	if (!existingWorkspace) {
		return [];
	}

	const { data } = await supabase.from('forms').select(`*`).eq('workspace_id', existingWorkspace.id).eq('id', formId).single();
	return data ?? [];
};