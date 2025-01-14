
import { getUserWorkspaceBySlug } from '@/actions/workspaces/getUserWorkspaceBySlug';
import { Sidebar } from '@/components/layout/sidebar';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function Layout({ params, children }: { params: { workspaceSlug: string; }, children: React.ReactNode; }) {

  const user = await getCurrentUser();

  if (!user) redirect('/auth/login');

  const userWorkspace = await getUserWorkspaceBySlug(params.workspaceSlug);  
  if (!userWorkspace) redirect('/');

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar />
      {children}
    </div>
  );


}
