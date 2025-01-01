'use client';

import { Button } from '@/components/ui/button';
import { Share2, Eye, Settings, Palette } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface FormHeaderActionsProps {
  onThemeSettingsOpen?: () => void;
  onPreviewOpen?: () => void;
  onShareOpen?: () => void;
  onSettingsOpen?: () => void;
}

export function FormHeaderActions({
  onThemeSettingsOpen,
  onPreviewOpen,
  onShareOpen,
  onSettingsOpen,
}: FormHeaderActionsProps) {
  return (
    <div className="flex items-center gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={onThemeSettingsOpen}
            >
              <Palette className="h-[18px] w-[18px] text-neutral-500" strokeWidth={2} />
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
              <Settings className="h-[18px] w-[18px] text-neutral-500" strokeWidth={2} />
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
              <Eye className="h-[18px] w-[18px] text-neutral-500" strokeWidth={2} />
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
  );
}