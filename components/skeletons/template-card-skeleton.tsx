'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function TemplateCardSkeleton() {
  return (
    <div className="overflow-hidden">
      <Skeleton className="h-[160px] rounded-md bg-neutral-50 bg-neutral-100" />
      <div className="pt-3">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-1" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}
