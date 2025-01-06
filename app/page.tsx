import { getUserWorkspaces } from '@/actions/workspaces/getUserWorkspaces';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function HomePage() {

  const user = await getCurrentUser();

  if (!user) redirect('/auth/login');

  const userWorkspaces = await getUserWorkspaces();

  if (!userWorkspaces || userWorkspaces.length === 0) redirect('/workspaces/create');
  
  redirect(`/${userWorkspaces[0]?.slug}`);
}
