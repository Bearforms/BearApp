
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
				updated_by:profiles!updated_by (
					id,
					first_name,
					last_name
				),
				members:workspace_members!workspace_members_workspace_id_fkey (
					user_id,
					role,
					profile:profiles!workspace_members_user_id_fkey (
						id,
						email,
						first_name,
						last_name,
						avatar_url
					)
				),
				customDomains:custom_domains!custom_domains_workspace_id_fkey (
					*
				)
		`)
		// .eq('owner_id', user.id)
		.eq(`slug`, idOrSlug).single();

	if (error) {
		console.log("Error in getUserWorkspaceBySlug_",idOrSlug, error);
	}

	return data;
};