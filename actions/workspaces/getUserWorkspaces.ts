
"use server";

import { getCurrentUser } from '@/lib/session';
import { createClient } from '@/supabase/server';

export const getUserWorkspaces = async () => {
	const user = await getCurrentUser();
	if (!user) {
		throw new Error('User not authenticated');
	}
	const supabase = await createClient();

	const { data } = await supabase.from('workspaces')
		.select(`
				*,
				workspace_members!inner (user_id)
			`)
		.eq('workspace_members.user_id', user!.id)
		.neq('slug', '');

	return data ?? [];
};