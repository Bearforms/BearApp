
"use server";

import sendMail from '@/lib/email';
import { getCurrentUser } from '@/lib/session';
import { createClient } from '@/supabase/server';

export const addWorkspaceMember = async ({ workspaceId, email, role }: { workspaceId: string, email: string, role: string; }) => {
	const user = await getCurrentUser();
	if (!user) {
		throw new Error('User not authenticated');
	}

	const supabase = await createClient();

	// check if workspace exists
	const { data: existingWorkspace } = await supabase.from('workspaces').select('id, name').eq('id', workspaceId).single();
	if (!existingWorkspace) {
		throw new Error('Workspace not found');
	}

	// check if user exists
	const { data: existingUser } = await supabase.from('profiles').select('*').eq('email', email).single();

	if (!existingUser) {
		// check if user is already invited
		const { data: existingInvitation } = await supabase.from('workspace_invitations').select('id').eq('workspace_id', workspaceId).eq('email', email).single();
		if (existingInvitation) {
			throw new Error('User is already invited');
		}

		// add user to workspace_invitations table and send email invitation
		const { data: invitationData, error: invitationError } = await supabase.from('workspace_invitations').insert({
			workspace_id: workspaceId,
			email,
			role,
			invited_by: user.id
		}).select().single();

		if (invitationError) {
			console.log('Workspace invitation error:', invitationError.message);
			throw invitationError;
		}

		const emailResponse = await sendMail({
			email,
			subject: 'You have been invited to a workspace',
			html: `
				<p>You have been invited to join workspace <b>${existingWorkspace.name}</b> on Bearforms.</p>
				<p>Click <a href="${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup">here</a> to create an account.</p>
			`
		});

		if (!emailResponse.success) {
			throw new Error('Error sending email');
		}

		return null;
	} else {
		// check if user is already a member
		const { data: existingMember, error } = await supabase.from('workspace_members').select('workspace_id').eq('workspace_id', workspaceId).eq('user_id', existingUser.id).single()
		if (existingMember) {
			throw new Error('User is already a member');
		}

		// add user to workspace_members table
		const { error: memberError, data } = await supabase.from('workspace_members').insert({
			workspace_id: workspaceId,
			user_id: existingUser.id,
			role,
			added_by: user.id
		}).select().single();

		if (memberError) {
			console.log('Workspace member error:', memberError.message);
			throw memberError;
		}

		return {...data, profile: existingUser};
	}


};