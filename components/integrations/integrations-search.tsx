'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface IntegrationsSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function IntegrationsSearch({
  value,
  onChange,
}: IntegrationsSearchProps) {
  return (
    <div className="relative w-full">
      <Input
        placeholder="Search integrations"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 h-9 rounded-md border-neutral-200"
      />
      <Search
        className="h-4 w-4 absolute left-3 top-2.5 text-neutral-500"
        strokeWidth={2}
      />
    </div>
  );
}
