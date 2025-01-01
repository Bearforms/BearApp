'use client';

import { Sidebar } from '../layout/sidebar';
import { DeletedHeader } from './deleted-header';

// ... rest of imports remain the same

export default function DeletedPage() {
  // ... rest of component logic remains the same

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <DeletedHeader />
        <div className="flex-1 overflow-y-auto p-5 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
            {/* ... rest of deleted items content remains the same */}
          </div>
        </div>
      </main>
    </div>
  );
}
