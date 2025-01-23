import { createClient } from '@/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface Session {
	email: string;
	id: string;
	profile: {
		first_name: string;
		last_name?: string;
		avatar_url?: string;
	};
}


export const useSession = () => {
	const { data, ...rest } = useQuery({
		queryKey: ['session'],
		queryFn: async () => {
			const supabase = await createClient();
			const { data, error } = await supabase.auth.getUser();

			if (error || !data.user) {
				console.error(error);
				return;
			}

			const { data: profileData } = await supabase.from('profiles').select('first_name, last_name, avatar_url').eq('id', data.user.id).single();

			return {
				email: data.user.email!,
				id: data.user.id,
				profile: (profileData ?? null) as any
			} as Session;
		},
		staleTime: 1000 * 60 * 60, // 1 hour
	});

	return { user: data, ...rest };
};