

"use server";

import { createAdminClient } from '@/supabase/admin';

export const readWorkspaceDomain = async (domain: string) => {
	const supabase = await createAdminClient();

	if (domain.includes('.')) { 
		const {data, error} = await supabase.from('custom_domains').select('*').eq('domain', domain).single();
		if (error) return null;

		const workspace = await supabase.from('workspaces').select('*').eq('id', data.workspace_id).single();
		return workspace.data;
	}

	const { data } = await supabase.from('workspaces').select(`*`).eq(`subdomain`, domain).single();
	return data;
};