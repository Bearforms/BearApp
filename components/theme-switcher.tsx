'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Palette } from 'lucide-react';

interface ThemeSwitcherProps {
  onSwitch: (scale: 'gray' | 'neutral' | 'slate' | 'zinc') => void;
}

export function ThemeSwitcher({ onSwitch }: ThemeSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Palette className="h-5 w-5" />
          <span className="sr-only">Switch color scale</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onSwitch('gray')}>
          Gray Scale
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSwitch('neutral')}>
          Neutral Scale
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSwitch('slate')}>
          Slate Scale
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSwitch('zinc')}>
          Zinc Scale
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}