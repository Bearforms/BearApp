
"use server";

import { getCurrentUser } from '@/lib/session';
import { createClient } from '@/supabase/server';
import { revalidatePath } from 'next/cache';

export const createWorkspace = async (name: string) => {
	const user = await getCurrentUser();
	if (!user) {
		throw new Error('User not authenticated');
	}

	const supabase = await createClient();

	const workspaceSlugBase = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
	let workspaceSlug = workspaceSlugBase + '-workspace';

	// check if slug exists
	const { data: existingWorkspace } = await supabase.from('workspaces').select('id').eq('slug', workspaceSlug).single();
	if (existingWorkspace) {
		workspaceSlug = workspaceSlugBase + '-' + Math.floor(Math.random() * 100000) + '-workspace';
	}

	const { data, error } = await supabase.from('workspaces').insert({
		name,
		owner_id: user.id,
		slug: workspaceSlug,
		is_public: false,
		description: null,
	});

	if (error) {
		throw error;
	}

	revalidatePath('/workspaces');

	return data;
};