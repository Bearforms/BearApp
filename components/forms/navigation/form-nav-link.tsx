'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface FormNavLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

export function FormNavLink({ href, isActive, children }: FormNavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex-1 px-3 h-8 flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-neutral-50 transition-colors',
        isActive
          ? 'bg-neutral-100 text-neutral-900'
          : 'text-neutral-600 hover:text-neutral-900'
      )}
    >
      {children}
    </Link>
  );
}
