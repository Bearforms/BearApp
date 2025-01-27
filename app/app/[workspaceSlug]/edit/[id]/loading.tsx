import { PageSkeleton } from '@/components/skeletons/page-skeleton';
import { HeaderSkeleton } from '@/components/skeletons/header-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <PageSkeleton header={<HeaderSkeleton />} className="p-8">
      <div className="w-full lg:w-8/12 bg-white mx-auto h-full rounded-md">
        <div className="space-y-8 max-w-[640px] mx-auto px-5 py-20">
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
          </div>

          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}

          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </PageSkeleton>
  );
}
