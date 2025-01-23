import { Database } from '@/database.types';
import { createClient } from '@/supabase/client';
import { Workspace } from '@/types/supabase';
import { useCallback, useEffect, useState } from 'react';
import { useSession } from './use-session';

export const useWorkspaces = () => {
	const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

	const { user } = useSession();

	const fetchWorkspaces = async () => {
		const supabase = await createClient();
		const { data, error } = await supabase.from('workspaces')
			.select(`
				*,
				members:workspace_members!workspace_members_workspace_id_fkey (
					user_id,
					role
				)
			`)
			.neq('slug', '');
			// .or(`owner_id.eq.${user!.id},workspace_members.user_id.eq.${user!.id}`);

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