'use client';

import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PanelLeft } from 'lucide-react';
import { useSidebarStore } from '@/stores/sidebar-store';
import { FormNav } from './form-nav';
import { FormTitle } from './form-title';
import { FormHeaderActions } from './form-header-actions';
import { FormNameMenu } from '../form-name-menu';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface FormHeaderProps {
  title?: string;
  showNav?: boolean;
  onThemeSettingsOpen?: () => void;
  onPreviewOpen?: () => void;
  onShareOpen?: () => void;
  onSettingsOpen?: () => void;
}

export function FormHeader({
  title,
  showNav = true,
  onThemeSettingsOpen,
  onPreviewOpen,
  onShareOpen,
  onSettingsOpen,
}: FormHeaderProps) {
  const { toggleSidebar } = useSidebarStore();
  const params = useParams();
  const formId = params.id as string;

  return (
    <div className="flex items-center justify-between px-7 h-12 bg-white border-b border-neutral-200">
      <div className="w-1/3">
        <div className="flex items-center gap-1.5 overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={toggleSidebar}
          >
            <PanelLeft
              className="h-[18px] w-[18px] text-neutral-500"
              strokeWidth={2}
            />
          </Button>
          <div className="flex items-center text-sm w-full">
            <Link
              href="/"
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Forms
            </Link>
            <ChevronRight className="h-4 w-4 mx-1 text-neutral-400" />
            <FormNameMenu formId={formId} name={title || 'Untitled Form'} />
          </div>
        </div>
      </div>

      {showNav && (
        <div className="w-1/3 flex justify-center">
          <FormNav />
        </div>
      )}

      <div className="w-1/3 flex justify-end">
        <FormHeaderActions
          onThemeSettingsOpen={onThemeSettingsOpen}
          onPreviewOpen={onPreviewOpen}
          onShareOpen={onShareOpen}
          onSettingsOpen={onSettingsOpen}
        />
      </div>
    </div>
  );
}
