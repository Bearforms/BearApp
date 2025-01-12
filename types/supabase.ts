import { Tables } from '@/database.types';

export type Workspace = Tables<'workspaces'> & {
	updated_by?: {
		id: string;
		first_name: string;
		last_name: string;
	}
};
export type Profile = Tables<'profiles'>;
export type WorkspaceMember = Tables<'workspace_members'>;

