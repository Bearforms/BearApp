'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formElements } from '@/lib/constants/form-elements';
import { cn } from '@/lib/utils';

interface FieldSelectionDropdownProps {
  onSelect: (type: string) => void;
  triggerClassName?: string;
  contentClassName?: string;
  label?: React.ReactNode;
}

export function FieldSelectionDropdown({
  onSelect,
  triggerClassName,
  contentClassName,
  label,
}: FieldSelectionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={cn('h-8 w-8 p-0', triggerClassName)}>
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn('w-72', contentClassName)}
        sideOffset={5}
      >
        <ScrollArea className="h-[360px]">
          {formElements.map((category) => (
            <div key={category.category} className="px-2 py-1.5">
              <DropdownMenuLabel className="text-xs font-medium text-neutral-500">
                {category.category}
              </DropdownMenuLabel>
              {category.items.map((element) => (
                <DropdownMenuItem
                  key={element.type}
                  onClick={() => onSelect(element.type)}
                  className="flex items-start gap-2 py-3 cursor-pointer"
                >
                  <element.icon
                    className="h-4 w-4 mt-0.5 text-neutral-500"
                    strokeWidth={2}
                  />
                  <div>
                    <span className="font-medium block">{element.label}</span>
                    <span className="text-sm text-muted-foreground">
                      {element.description}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
