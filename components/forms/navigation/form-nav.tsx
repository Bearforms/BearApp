'use client';

import { useParams, usePathname } from 'next/navigation';
import { FormNavLink } from './form-nav-link';

export function FormNav() {
  const params = useParams();
  const pathname = usePathname();
  const formId = params.id as string;

  return (
    <nav className="flex p-0 space-x-1.5">
      <FormNavLink 
        href={`/${params.workspaceSlug}/edit/${formId}`}
        isActive={pathname === `/${params.workspaceSlug}/edit/${formId}`}
      >
        Form
      </FormNavLink>
      <FormNavLink 
        href={`/${params.workspaceSlug}/responses/${formId}`}
        isActive={pathname === `/${params.workspaceSlug}/responses/${formId}`}
      >
        Responses
      </FormNavLink>
      <FormNavLink 
        href={`/${params.workspaceSlug}/integrations/${formId}`}
        isActive={pathname === `/${params.workspaceSlug}/integrations/${formId}`}
      >
        Integrations
      </FormNavLink>
    </nav>
  );
}