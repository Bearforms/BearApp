'use client';

import { Sidebar } from '@/components/layout/sidebar';

interface PageSkeletonProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function PageSkeleton({
  header,
  children,
  className,
}: PageSkeletonProps) {
  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        {header}
        <div className={className || 'flex-1 overflow-y-auto'}>{children}</div>
      </main>
    </div>
  );
}
