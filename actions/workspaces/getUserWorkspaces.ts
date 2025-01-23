
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
			members:workspace_members!workspace_members_workspace_id_fkey (
				user_id,
				role
			)
		`)
	
	return data ?? [];
};