
"use server";

import { getCurrentUser } from '@/lib/session';
import { createClient } from '@/supabase/server';

export const getUserWorkspaceBySlug = async (idOrSlug: string) => {
	const user = await getCurrentUser();
	if (!user) {
		throw new Error('User not authenticated');
	}
	const supabase = await createClient();

	const { data, error } = await supabase.from('workspaces').select('*').eq('owner_id', user.id).eq(`slug`, idOrSlug).single();

	if (error) {
		console.log("Error in getUserWorkspaceBySlug", error);
	}

	return data;
};