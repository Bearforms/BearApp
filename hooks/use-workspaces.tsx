import { createClient } from '@/supabase/client';
import { Workspace } from '@/types/supabase';
import { useEffect, useState } from 'react';
import { useSession } from './use-session';

export const useWorkspaces = () => {
	const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

	const { user } = useSession();

	console.log('user', user);
	console.log('workspaces', workspaces);



	const fetchWorkspaces = async () => {
		const supabase = await createClient();
		const { data, error } = await supabase.from('workspaces')
			.select(`
				*,
				workspace_members!inner (user_id)
			`)
			.eq('workspace_members.user_id', user!.id)
			.neq('slug', '');

		if (error) {
			return;
		}

		setWorkspaces(data);
	};

	useEffect(() => {
		if (user?.id) fetchWorkspaces();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?.id]);

	return { workspaces, refetchWorkspaces: fetchWorkspaces };
};