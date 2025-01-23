'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { TemplatesHeader } from '@/components/templates/templates-header';
import { CategorySelect } from '@/components/templates/category-select';
import {
  formTemplates,
} from '@/lib/constants/form-templates';
import { TemplateCard } from '@/components/templates/template-card';
import { Search } from 'lucide-react';

export default function TemplatesPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTemplates = formTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(search.toLowerCase()) ||
      template.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || template.categoryId === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="flex-1 flex flex-col min-w-0">
      <TemplatesHeader />
      <div className="flex-1 overflow-y-auto p-8">
        <div className="space-y-6 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3">
            <div className="relative w-full">
              <Input
                placeholder="Search templates"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 w-full rounded-md border-neutral-200"
              />
              <Search
                className="h-4 w-4 absolute left-3 top-2.5 text-neutral-500"
                strokeWidth={2}
              />
            </div>
            <CategorySelect
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-neutral-900 mb-1">
                No templates found
              </h3>
              <p className="text-sm text-neutral-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
