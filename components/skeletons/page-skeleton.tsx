'use client';

interface PageSkeletonProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  showSidebar?: boolean;
}

export function PageSkeleton({
  header,
  children,
  className,
}: PageSkeletonProps) {
  return (
    <main className="flex-1 flex flex-col min-w-0">
      {header}
      <div className={className || 'flex-1 overflow-y-auto'}>{children}</div>
    </main>
  );
}
