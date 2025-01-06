'use client';

import { ResponsesHeader } from '@/components/responses/responses-header';
import { ResponsesTable } from '@/components/responses/responses-table';

export default function ResponsesPage() {
  return (
    <main className="flex-1 flex flex-col min-w-0">
      <div className="flex-shrink-0">
        <ResponsesHeader />
      </div>
      <div className="flex-1 overflow-y-auto bg-white">
        <ResponsesTable />
      </div>
    </main>
  );
}
