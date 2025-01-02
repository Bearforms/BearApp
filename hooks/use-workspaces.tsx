import { Database } from '@/database.types';
import { createClient } from '@/supabase/client';
import { Workspace } from '@/types/supabase';
import { useEffect, useState } from 'react';
import { useSession } from './use-session';

export const useWorkspaces = () => {
	const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

	const {user} = useSession();

	useEffect(() => {
		const fetchWorkspaces = async () => {
			const supabase = await createClient();
			const { data, error } = await supabase.from('workspaces').select('*').eq('owner_id', user?.id);

			if (error) {
				console.error(error);
				return;
			}

			setWorkspaces(data);
		};

		if(user?.id)fetchWorkspaces();
	}, [user?.id]);

	return { workspaces };
};