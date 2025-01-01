'use client';

import { FormField } from '@/components/forms/form-field';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FormLayout } from '@/components/forms/preview/form-layout';

interface TemplatePreviewProps {
  template: {
    name: string;
    description: string;
    fields: any[];
    themeSettings?: any;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUseTemplate: () => void;
}

export function TemplatePreview({
  template,
  open,
  onOpenChange,
  onUseTemplate,
}: TemplatePreviewProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" w-11/12 lg:w-8/12 max-h-[90%] h-[90vh] p-0 gap-0">
        <DialogHeader className="h-[52px] min-h-[52px] px-4 flex flex-row items-center justify-between border-b space-y-0">
          <DialogTitle className="text-base font-medium">
            Form preview
          </DialogTitle>
          <Button
            variant="outline"
            size="sm"
            className="mt-0 mr-10"
            onClick={() => {
              onUseTemplate();
              onOpenChange(false);
            }}
          >
            <Copy className="h-4 w-4 mr-2" />
            Use template
          </Button>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <FormLayout themeSettings={template.themeSettings}>
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-semibold form-heading">
                  {template.name}
                </h1>
                <p className="mt-2 text-sm text-neutral-500 form-body">
                  {template.description}
                </p>
              </div>

              <div className="space-y-[var(--theme-spacing)]">
                {template.fields.map((field) => (
                  <FormField
                    key={field.id}
                    field={field}
                    preview
                    themeSettings={template.themeSettings}
                  />
                ))}
              </div>
            </div>
          </FormLayout>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
