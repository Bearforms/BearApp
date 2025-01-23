'use client';

import { PageSkeleton } from '@/components/skeletons/page-skeleton';
import { FormCardSkeleton } from '@/components/skeletons/form-card-skeleton';
import { HeaderSkeleton } from '@/components/skeletons/header-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <PageSkeleton
      showSidebar={false}
      header={<HeaderSkeleton />}
      className="flex-1 overflow-y-auto p-8"
    >
      <div className="space-y-6 w-full">
        <div className="flex items-center justify-between">
          <div className="relative">
            <Skeleton className="h-9 w-[240px]" />
            <Skeleton className="h-4 w-4 absolute left-3 top-2.5" />
          </div>
          <Skeleton className="h-9 w-[100px]" />
        </div>

        <div className="flex-col space-y-3">
          {[...Array(8)].map((_, i) => (
            <FormCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </PageSkeleton>
  );
}
