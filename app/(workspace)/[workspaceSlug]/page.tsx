'use client';

import { FormList } from '@/components/forms/form-list';
import { FormHeader } from '@/components/forms/form-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { NewFormModal } from '@/components/forms/new-form-modal';
import { useFormStore } from '@/stores/form-store';
import { WelcomeMessage } from '@/components/welcome/welcome-message';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [showNewFormModal, setShowNewFormModal] = useState(false);
  const forms = useFormStore((state) =>
    state.forms.filter((f) => !f.deletedAt)
  );
  const hasExistingForms = forms.length > 0;

  return (
    <main className="flex-1 flex flex-col min-w-0">
      <FormHeader />
      <div className="flex-1 overflow-y-auto p-8">
        <div className="space-y-6 w-full">
          <div className="flex items-center justify-between">
            <WelcomeMessage />
            <Button onClick={() => setShowNewFormModal(true)} className="h-9">
              <Plus className="mr-2 h-4 w-4" />
              New form
            </Button>
          </div>

          {hasExistingForms && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-3">
              <div className="relative w-full">
                <Input
                  placeholder="Search forms"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-9 w-full border-neutral-200"
                />
                <Search
                  className="h-4 w-4 absolute left-3 top-2.5 text-neutral-500"
                  strokeWidth={2}
                />
              </div>
            </div>
          )}
          <FormList
            searchQuery={search}
            onNewForm={() => setShowNewFormModal(true)}
          />
        </div>
      </div>

      <NewFormModal
        open={showNewFormModal}
        onOpenChange={setShowNewFormModal}
      />
    </main>
  );
}
