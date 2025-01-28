'use client';

import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader, PanelLeft } from 'lucide-react';
import { useSidebarStore } from '@/stores/sidebar-store';
import { FormNav } from './form-nav';
import { FormTitle } from './form-title';
import { FormHeaderActions } from './form-header-actions';
import { FormNameMenu } from '../form-name-menu';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useFormStore } from '@/stores/form-store';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from "lodash";

interface FormHeaderProps {
  title?: string;
  showNav?: boolean;
  onPreviewOpen?: () => void;
  handleOpenAction: (action: "themeSettings" | "share" | "settings" | null) => void;
}

export function FormHeader({
  title,
  showNav = true,
  onPreviewOpen,
  handleOpenAction
}: FormHeaderProps) {
  const { toggleSidebar } = useSidebarStore();
  const params = useParams();
  const formId = params.id as string;
  const saveStatus = useFormStore(state => state.saveStatus);

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
              href={`/app/${params.workspaceSlug}`}
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Forms
            </Link>
            <ChevronRight className="h-4 w-4 mx-1 text-neutral-400" />

            <span className="text-sm truncate">{title ?? 'Untitled form'}</span>

            <p className='flex items-center gap-1 ml-4'>

              {
                saveStatus.saving && (
                  <>
                    <Loader className='animate-spin h-5 w-5' />

                    <span className="text-sm text-neutral-600">Saving...</span>
                  </>
                )
              }
              {saveStatus.isSaved && <span className="text-sm text-neutral-600">Saved</span>}
            </p>

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
          onPreviewOpen={onPreviewOpen}
          handleOpenAction={handleOpenAction}
        />
      </div>
    </div>
  );
}
