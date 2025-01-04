import { createClient } from '@/supabase/client';
import { useEffect, useState } from 'react';

export const useSession = () => {
	const [authUser, setAuthUser] = useState<{
		email: string, id: string;
		profile?: {
			first_name?: string;
			last_name?: string;
			avatar_url?: string;
		};
	} | null>(null);

	useEffect(() => {
		const fetchAuthUser = async () => {
			const supabase = await createClient();
			const { data, error } = await supabase.auth.getUser();

			if (error || !data.user) {
				console.error(error);
				return;
			}

			const { data: profileData } = await supabase.from('profiles').select('first_name, last_name, avatar_url').eq('id', data.user.id).single();

			setAuthUser({
				email: data.user.email!,
				id: data.user.id,
				profile:( profileData?? null) as any
			});
		};

		fetchAuthUser();
	}, []);

	return { user: authUser };
};