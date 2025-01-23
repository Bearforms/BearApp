'use client';

import { PageSkeleton } from '@/components/skeletons/page-skeleton';
import { HeaderSkeleton } from '@/components/skeletons/header-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function NewFormLoading() {
  return (
    <PageSkeleton header={<HeaderSkeleton />}>
      <div className="max-w-[640px] mx-auto px-5 py-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
          </div>

          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="space-y-2 p-4 rounded-md bg-neutral-50/50"
              >
                <Skeleton className="h-5 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>

          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </PageSkeleton>
  );
}
