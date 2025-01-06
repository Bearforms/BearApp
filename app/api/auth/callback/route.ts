import { createAdminClient } from '@/supabase/admin';
import { createClient } from '@/supabase/server';
import { User } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get('code');
	const next = searchParams.get('next') ?? '/';

	if (code) {
		const supabase = await createClient();
		const { error, data } = await supabase.auth.exchangeCodeForSession(code);
		console.log('Error:', error);
		if (!error) {
			await createUserInitData(data.user);
			const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before load balancer
			const isLocalEnv = process.env.NODE_ENV === 'development';
			if (isLocalEnv) {
				return NextResponse.redirect(`${origin}${next}`);
			} else if (forwardedHost) {
				return NextResponse.redirect(`https://${forwardedHost}${next}`);
			} else {
				return NextResponse.redirect(`${origin}${next}`);
			}
		}
	}

	return NextResponse.redirect(`${origin}/auth/login`);
}
 

const createUserInitData = async (user: User) => {

	try {
		const supabase = await createAdminClient();

		// check if user exists
		const { data: existingUser } = await supabase.from('profiles').select('id').eq('id', user.id).single();
		if (existingUser) {
			return;
		}

		// Create user profile
		const { error: profileError } = await supabase.from('profiles')
			.insert({
				id: user.id,
				email: user.email,
				first_name: user.user_metadata?.full_name ? user.user_metadata?.full_name.split(' ')[0] : null,
				last_name: user.user_metadata?.full_name ? user.user_metadata?.full_name.split(' ')[1] : null,
				avatar_url: user.user_metadata?.avatar_url ?? null
			});

		if (profileError) {
			console.log('Profile error:', profileError.message);
			return;
		}

		// Create workspace
		const workspaceName = "Personal Workspace";
		const workspaceSlugBase = user.email?.split('@')[0].toLowerCase().replace(/[^a-z0-9]+/g, '-');
		let workspaceSlug = workspaceSlugBase + '-workspace';

		// check if slug exists
		const { data: existingWorkspace } = await supabase.from('workspaces').select('id').eq('slug', workspaceSlug).single();
		if (existingWorkspace) {
			workspaceSlug = workspaceSlugBase + '-' + Math.floor(Math.random() * 100000) + '-workspace';
		}

		const { data: workspaceData, error: workspaceError } = await supabase
			.from('workspaces')
			.insert({
				name: workspaceName,
				slug: workspaceSlug,
				owner_id: user.id,
				is_public: false
			})
			.select()
			.single();

		if (workspaceError) {
			console.log('Workspace error:', workspaceError.message);
			return;
		}

		// Add user as workspace owner
		await supabase
			.from('workspace_members')
			.insert({
				workspace_id: workspaceData.id,
				user_id: user.id,
				role: 'owner'
			});

	} catch (error) {
		console.log('Error:', error);
	}
};