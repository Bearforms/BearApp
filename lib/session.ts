
import { createClient } from '@/supabase/server';

export const getCurrentUser = async () => {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	return error ? null : data?.user;
};