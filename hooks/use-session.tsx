import { createClient } from '@/supabase/client';
import { useEffect, useState } from 'react';

export const useSession = () => {
	const [authUser, setAuthUser] = useState<{ email: string, id: string; } | null>(null);

	useEffect(() => {
		const fetchAuthUser = async () => {
			const supabase = await createClient();
			const { data, error } = await supabase.auth.getUser();

			if (error || !data.user) {
				console.error(error);
				return;
			}

			setAuthUser({
				email: data.user.email!,
				id: data.user.id,
			});
		};

		fetchAuthUser();
	}, []);

	return { user: authUser };
};