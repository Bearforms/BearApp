import { Tables } from '@/database.types';

export type Workspace = Tables<'workspaces'> & {
	updated_by?: {
		id: string;
		first_name: string;
		last_name: string;
	}
	members?: WorkspaceMember[];
	customDomains: CustomDomain[];
};
export type Profile = Tables<'profiles'>;
export type CustomDomain = Tables<'custom_domains'>;
export type WorkspaceMember = Tables<'workspace_members'> & {
	profile?: Profile;
};

