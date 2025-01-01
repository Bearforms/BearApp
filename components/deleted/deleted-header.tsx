'use client';

import { Button } from '@/components/ui/button';
import { PanelLeft } from 'lucide-react';
import { useSidebarStore } from '@/stores/sidebar-store';

export function DeletedHeader() {
  const { toggleSidebar } = useSidebarStore();

  return (
    <div className="flex items-center justify-between px-7 h-12 bg-white border-b border-neutral-200">
      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={toggleSidebar}
        >
          <PanelLeft className="h-[18px] w-[18px] text-neutral-500" strokeWidth={2} />
        </Button>
        <h1 className="text-sm font-normal">Deleted Forms</h1>
      </div>
    </div>
  );
}
