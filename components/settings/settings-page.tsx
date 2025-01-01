'use client';

import { Sidebar } from '../layout/sidebar';
import { SettingsHeader } from './settings-header';

// ... rest of imports remain the same

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <SettingsHeader />
        <div className="flex-1 overflow-y-auto px-8 py-6 bg-neutral-50">
          <div className="max-w-2xl mx-auto">
            {/* ... rest of settings content remains the same */}
          </div>
        </div>
      </main>
    </div>
  );
}
