'use client';

import { Button } from '@/components/ui/button';
import {
  Share2,
  Eye,
  PanelLeft,
  Settings,
  ChevronRight,
  Palette,
  ChevronDown,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useSidebarStore } from '@/stores/sidebar-store';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useFormStore } from '@/stores/form-store';
import { FormNameMenu } from './form-name-menu';
import { toast } from '@/hooks/use-toast';
import { nanoid } from 'nanoid';
import { FormResponsesNav } from './navigation/form-responses-nav';

interface FormBuilderHeaderProps {
  onThemeSettingsOpen: () => void;
  onPreviewOpen: () => void;
  onShareOpen: () => void;
  onSettingsOpen: () => void;
}

export function FormBuilderHeader({
  onThemeSettingsOpen,
  onPreviewOpen,
  onShareOpen,
  onSettingsOpen,
}: FormBuilderHeaderProps) {
  const { toggleSidebar } = useSidebarStore();
  const params = useParams();
  const router = useRouter();
  const form = useFormStore((state) =>
    state.forms.find((f) => f.id === params?.id)
  );
  const updateForm = useFormStore((state) => state.updateForm);
  const addForm = useFormStore((state) => state.addForm);
  const deleteForm = useFormStore((state) => state.deleteForm);

  const handleNameChange = async (name: string) => {
    if (form) {
      await updateForm(form.id, { name });
      toast({ description: 'Form renamed' });
    }
  };

  const handleDuplicate = () => {
    if (form) {
      const newForm = {
        ...form,
        id: nanoid(),
        name: `${form.name} (Copy)`,
        responses: 0,
        lastUpdated: new Date().toISOString(),
      };
      addForm(newForm);
      toast({ description: 'Form duplicated' });
      router.push(`/app/${params?.workspaceSlug}/edit/${newForm.id}`);
    }
  };

  const handleDelete = () => {
    if (form) {
      deleteForm(form.id);
      toast({ description: 'Form moved to trash' });
      router.push(`/app/${params?.workspaceSlug}`);
    }
  };

  return (
    <div className="flex space-x-3 items-center justify-between px-7 h-12 bg-white border-b border-neutral-200">
      <div className="w-1/3 flex items-center gap-1.5">
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
        <div className="flex items-center text-sm">
          <Link
            href={`/app/${params.workspaceSlug}`}
            className="text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Forms
          </Link>
          <ChevronRight className="h-4 w-4 mx-1 text-neutral-400" />
          <FormNameMenu
          />
        </div>
      </div>

      <FormResponsesNav />

      <div className="w-1/3 flex justify-end items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={onThemeSettingsOpen}
              >
                <Palette
                  className="h-[18px] w-[18px] text-neutral-500"
                  strokeWidth={2}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Theme</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={onSettingsOpen}
              >
                <Settings
                  className="h-[18px] w-[18px] text-neutral-500"
                  strokeWidth={2}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Settings</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={onPreviewOpen}
              >
                <Eye
                  className="h-[18px] w-[18px] text-neutral-500"
                  strokeWidth={2}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Preview</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button size="sm" className="h-8 ml-1" onClick={onShareOpen}>
          <Share2 className="h-4 w-4 mr-2" strokeWidth={2} />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </div>
    </div>
  );
}
