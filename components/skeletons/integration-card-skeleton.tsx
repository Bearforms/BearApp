'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function IntegrationCardSkeleton() {
  return (
    <div className="overflow-hidden bg-white p-4 rounded-md h-">
      <Skeleton className="h-10 w-10" />
      <Skeleton className="h-4 w-20 mt-2" />
      <div className="mt-4">
        <div className="flex-col space-y-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-10" />
        </div>
        <div className="flex items-center mt-3">
          <Skeleton className="h-9 w-full" />
        </div>
      </div>
    </div>
  );
}
