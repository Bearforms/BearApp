import { FormSettings } from './../../types/form';

"use server";

import { defaultButtonSettings, defaultFormSettings, defaultThankYouSettings, defaultThemeSettings } from '@/lib/constants/theme-defaults';
import { getCurrentUser } from '@/lib/session';
import { createClient } from '@/supabase/server';

export const createForm = async ({ name, workspaceSlug }: { name: string, workspaceSlug: string; }) => {
	const user = await getCurrentUser();
	if (!user) {
		throw new Error('User not authenticated');
	}

	const supabase = await createClient();

	const { data: existingWorkspace } = await supabase.from('workspaces').select('id').eq('slug', workspaceSlug).single();
	if (!existingWorkspace) {
		throw new Error('Workspace not found');
	}

	const newForm = {
		name,
		title: '',
		description: '',
		responses: 0,
		lastUpdated: new Date().toISOString(),
		fields: [],
		formSettings: {
			...defaultFormSettings,
		},
		themeSettings: {
			...defaultThemeSettings,
			coverType: 'color' as const,
			showLogo: true,
			coverImage: '',
			coverColor: '#f3f4f6',
		},
		thankYouSettings: {
			...defaultThankYouSettings,
		},
		buttonSettings: {
			...defaultButtonSettings
		},
		added_by: user.id,
		workspace_id: existingWorkspace.id,
		updated_by: user.id,
	};

	const { data: formData, error: formError } = await supabase.from('forms').insert(newForm).select().single();

	if (formError) {
		throw formError;
	}
	return formData;
};