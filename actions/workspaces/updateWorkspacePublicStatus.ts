
"use server";

import { getCurrentUser } from '@/lib/session';
import { createClient } from '@/supabase/server';
import { revalidatePath } from 'next/cache';

export const updateWorkspacePublicStatus = async ({ workspaceId, isPublic }: { workspaceId: string, isPublic: boolean; }) => {
	const user = await getCurrentUser();
	if (!user) {
		throw new Error('User not authenticated');
	}

	const supabase = await createClient();
	const { error } = await supabase.from('workspaces').update({
		is_public: isPublic,
		updated_at: new Date(),
		updated_by: user.id
	}).eq('id', workspaceId);

	if (error) {
		console.log("Error in updateWorkspacePublicStatus", error);
		throw new Error('Failed to update workspace public status');
	}

	revalidatePath('/app/[workspaceSlug]', 'page');
};