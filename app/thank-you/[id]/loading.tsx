'use client';

import { PageSkeleton } from '@/components/skeletons/page-skeleton';
import { HeaderSkeleton } from '@/components/skeletons/header-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function ThankYouLoading() {
  return (
    <PageSkeleton header={<HeaderSkeleton />}>
      <div className="max-w-[640px] mx-auto px-5 py-12">
        <div className="space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </PageSkeleton>
  );
}