'use client';

import { memo } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const FormNav = memo(function FormNav() {
  const params = useParams();
  const pathname = usePathname();
  const formId = params.id as string;

  const navItems = [
    { href: `/edit/${formId}`, label: 'Form' },
    { href: `/responses/${formId}`, label: 'Responses' },
    { href: `/integrations/${formId}`, label: 'Integrations' },
  ];

  return (
    <nav className="flex p-0 space-x-1.5">
      {navItems.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'flex-1 px-3 h-8 flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-neutral-100 transition-colors',
            pathname === href
              ? 'bg-neutral-200 text-neutral-900'
              : 'text-neutral-600 hover:text-neutral-900'
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
});