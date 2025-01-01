'use client';

import { useParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { FormNavLink } from './form-nav-link';

export function FormNav() {
  const params = useParams();
  const pathname = usePathname();
  const formId = params.id as string;

  return (
    <nav className="flex p-0 space-x-1.5">
      <FormNavLink 
        href={`/edit/${formId}`}
        isActive={pathname === `/edit/${formId}`}
      >
        Form
      </FormNavLink>
      <FormNavLink 
        href={`/responses/${formId}`}
        isActive={pathname === `/responses/${formId}`}
      >
        Responses
      </FormNavLink>
      <FormNavLink 
        href={`/integrations/${formId}`}
        isActive={pathname === `/integrations/${formId}`}
      >
        Integrations
      </FormNavLink>
    </nav>
  );
}