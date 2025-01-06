'use client';

import { PageSkeleton } from '@/components/skeletons/page-skeleton';
import { HeaderSkeleton } from '@/components/skeletons/header-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <PageSkeleton header={<HeaderSkeleton />}>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-4">
            <Skeleton className="h-[150px] w-full" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
    </PageSkeleton>
  );
}