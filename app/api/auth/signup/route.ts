// app/api/auth/signup/route.ts
import { z } from 'zod';
import { createUserSchema } from '@/lib/validations/auth';
import { createAdminClient } from '@/supabase/admin';

export async function POST(request: Request) {
	try {
		const supabase = await createAdminClient();
		const body = await request.json();
		const validatedData = createUserSchema.parse(body);

		// check if user exists 
		const { data: existingUser } = await supabase.from('profiles').select('id').eq('email', validatedData.email).single();
		if (existingUser) {
			return Response.json('User already exists', { status: 400 });
		}

		const { data: userData, error: userError } = await supabase.auth.admin.createUser({
			email: validatedData.email,
			password: validatedData.password,
			email_confirm: true,
			// user_metadata: {
			// 	full_name: `${validatedData.firstName} ${validatedData.lastName}`
			// }
		});

		if (userError) {
			console.log('User error:', userError.message);
			
			return Response.json('Failed to create user account', { status: 400 });
		}

		const userId = userData.user.id;

		// Start a transaction using Supabase
		const { error: initError } = await supabase.from('profiles')
			.insert({
				id: userId,
				email: validatedData.email,
				first_name: validatedData.firstName,
				last_name: validatedData.lastName,
				avatar_url: null
			});

		if (initError) {
			console.log('Profile error:', initError.message);
			
			await supabase.auth.admin.deleteUser(userId);
			return Response.json('Failed to create user profile', { status: 400 });
		}

		// Create workspace
		const workspaceName = "Personal Workspace";
		const workspaceSlugBase = validatedData.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]+/g, '-');
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
				owner_id: userId,
				is_public: false
			})
			.select()
			.single();

		if (workspaceError) {
			console.log('Workspace error:', workspaceError.message);
			
			await supabase.auth.admin.deleteUser(userId);
			await supabase.from('profiles').delete().match({ id: userId });
			return Response.json('Failed to create workspace', { status: 400 });
		}

		// Add user as workspace owner
		const { error: memberError } = await supabase
			.from('workspace_members')
			.insert({
				workspace_id: workspaceData.id,
				user_id: userId,
				role: 'owner'
			});

		if (memberError) {
			await supabase.auth.admin.deleteUser(userId);
			await supabase.from('profiles').delete().match({ id: userId });
			await supabase.from('workspaces').delete().match({ id: workspaceData.id });
			return Response.json('Failed to create workspace membership', { status: 400 });
		}

		return Response.json(
			{
				message: 'User created successfully',
				user: {
					id: userId,
					email: validatedData.email,
					workspace: {
						id: workspaceData.id,
						slug: workspaceData.slug
					}
				}
			},
			{ status: 201 }
		);

	} catch (error) {
		if (error instanceof z.ZodError) {
			return Response.json(
				{ error: error.errors },
				{ status: 400 }
			);
		}

		console.error('Signup error:', error);
		return Response.json('Internal server error', { status: 500 });
	}
}