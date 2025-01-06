'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function FormResponsesNav() {
  const params = useParams();
  const pathname = usePathname();
  const formId = params.id as string;

  const isFormView = pathname === `/edit/${formId}`;
  const isResponsesView = pathname === `/responses/${formId}`;

  return (
    <div className="hidden w-1/3 sm:flex justify-center items-center">
      <nav className="flex p-0 space-x-1.5">
        <Link
          href={`/${params.workspaceSlug}/edit/${formId}`}
          className={cn(
            'flex-1 px-3 h-8 flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-neutral-50 transition-colors',
            isFormView
              ? 'bg-neutral-100 text-neutral-900'
              : 'text-neutral-600 hover:text-neutral-900'
          )}
        >
          Form
        </Link>
        <Link
          href={`/${params.workspaceSlug}/responses/${formId}`}
          className={cn(
            'flex-1 px-3 h-8 flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-neutral-50 transition-colors',
            isResponsesView
              ? 'bg-neutral-100 text-neutral-900'
              : 'text-neutral-600 hover:text-neutral-900'
          )}
        >
          Responses
        </Link>
      </nav>
    </div>
  );
}
