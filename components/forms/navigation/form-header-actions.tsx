'use client';

import { Button } from '@/components/ui/button';
import { Share2, Eye, Settings, Palette } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { FormNameMenu } from '../form-name-menu';

interface FormHeaderActionsProps {
  onPreviewOpen?: () => void;
  handleOpenAction: (action: "themeSettings" | "share" | "settings" | null) => void;
}

export function FormHeaderActions({
  onPreviewOpen,
  handleOpenAction
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
              onClick={()=>handleOpenAction("themeSettings")}
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
              onClick={()=>handleOpenAction("settings")}
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

      <Button size="sm" className="h-8 ml-1" onClick={()=>handleOpenAction("share")}>
        <Share2 className="h-4 w-4 mr-2" strokeWidth={2} />
        <span className="hidden sm:inline">Share</span>
      </Button>

      <FormNameMenu />
    </div>
  );
}