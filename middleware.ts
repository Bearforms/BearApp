import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/supabase/middleware';
import { readWorkspaceDomain } from './actions/workspaces/readWorkspaceDomain';
import { Workspace } from './types/supabase';

const RESERVED_SUBDOMAINS = ['www', 'api', 'admin', 'app'];

interface WorkspaceConfig {
  workspace: Workspace | null;
  isValid: boolean;
}

function getSubdomain(host: string): string | null {
  const baseDomain = process.env.NEXT_PUBLIC_APP_DOMAIN;

  let currentHost;
  if (process.env.NODE_ENV === "production") {
    currentHost = host?.replace(`.${baseDomain}`, "").replace(`${baseDomain}`, "");
  } else {
    currentHost = host?.replace(`.localhost:3000`, "").replace(`localhost:3000`, "");
  }

  return currentHost;
}


export async function middleware(request: NextRequest) {

  const hostname = request.headers.get('host') || '';

  const url = request.nextUrl;
  const pathname = url.pathname;

  // Get subdomain
  const subdomain = getSubdomain(hostname);

  if (!subdomain || RESERVED_SUBDOMAINS.includes(subdomain)) {    
    // Update session without tenant context
    return await updateSession(request);
  }

  if (subdomain === 'forms') { 
    return NextResponse.rewrite(new URL(`/forms${pathname}`, request.url));
  }

  // Validate domain
  const workspace = await readWorkspaceDomain(subdomain);
  
  console.log("Workspace: ", workspace);
  

  if (!workspace?.id || !workspace?.subdomain) {
    return NextResponse.rewrite(new URL('/not-available', request.url));
  }
  
  return NextResponse.rewrite(new URL(`/${workspace.subdomain}${pathname}`, request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};