'use client';

import { Button } from '@/components/ui/button';
import { PanelLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function HeaderSkeleton() {
  return (
    <div className="flex items-center h-12 justify-between px-7 py-2 bg-white border-b border-neutral-200">
      <div className="flex items-center gap-1.5">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <PanelLeft className="h-[18px] w-[18px] text-neutral-500" />
        </Button>
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="flex items-center gap-1">
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-20 rounded-md" />
      </div>
    </div>
  );
}
