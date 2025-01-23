'use client';

import { PageSkeleton } from '@/components/skeletons/page-skeleton';
import { FormCardSkeleton } from '@/components/skeletons/form-card-skeleton';
import { HeaderSkeleton } from '@/components/skeletons/header-skeleton';

export default function Loading() {
  return (
    <PageSkeleton header={<HeaderSkeleton />}>
      <div className="p-7 w-full">
        <div className="flex-col space-y-3">
          {[...Array(8)].map((_, i) => (
            <FormCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </PageSkeleton>
  );
}
