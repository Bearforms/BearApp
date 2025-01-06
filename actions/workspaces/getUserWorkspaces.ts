
"use server";

import { getCurrentUser } from '@/lib/session';
import { createClient } from '@/supabase/server';

export const getUserWorkspaces = async () => {
	const user = await getCurrentUser();
	if (!user) {
		throw new Error('User not authenticated');
	}
	const supabase = await createClient();

	const { data, error } = await supabase.from('workspaces').select('id, slug').eq('owner_id', user.id);
	
	if (error) {
		console.log("Error in getUserWorkspaceBySlug", error);
	}

	return data ?? [];
};