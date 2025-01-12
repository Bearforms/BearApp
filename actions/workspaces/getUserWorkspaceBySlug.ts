
"use server";

import { getCurrentUser } from '@/lib/session';
import { createClient } from '@/supabase/server';

const IGNORED_WORKSPACE_SLUGS = ['public', 'auth', 'api', 'admin', 'settings', 'templates', 'deleted', 'favicon.ico', 'robots.txt'];


export const getUserWorkspaceBySlug = async (idOrSlug: string) => {
	if (IGNORED_WORKSPACE_SLUGS.includes(idOrSlug)) {
		return null;
	}
	
	const user = await getCurrentUser();
	if (!user) {
		throw new Error('User not authenticated');
	}
	const supabase = await createClient();
	

	const { data, error } = await supabase.from('workspaces')
		.select(`
				*, 
				profiles!updated_by (
					id,
					first_name
				)
		`).eq('owner_id', user.id).eq(`slug`, idOrSlug).single();

	if (error) {
		console.log("Error in getUserWorkspaceBySlug_",idOrSlug, error);
	}

	return data;
};