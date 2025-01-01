'use client';

import { PageSkeleton } from '@/components/skeletons/page-skeleton';
import { HeaderSkeleton } from '@/components/skeletons/header-skeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { IntegrationCardSkeleton } from '@/components/skeletons/integration-card-skeleton';

export default function Loading() {
  return (
    <PageSkeleton
      header={<HeaderSkeleton />}
      className="flex-1 overflow-y-auto p-8"
    >
      <div className="space-y-6 w-full">
        <div className="flex gap-4 items-center">
          <Skeleton className="h-9 w-[240px]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
          {[...Array(8)].map((_, i) => (
            <IntegrationCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </PageSkeleton>
  );
}
