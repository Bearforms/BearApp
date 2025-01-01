'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RatingChart } from './charts/rating-chart';
import { ChoiceChart } from './charts/choice-chart';
import { ResponseStats } from './stats/response-stats';
import { TextSummary } from './text/text-summary';
import { TimeSummary } from './time/time-summary';
import { DateSummary } from './date/date-summary';
import { CompletionMetrics } from './metrics/completion-metrics';
import { FormField } from '@/types/form';
import { Separator } from '@/components/ui/separator';

interface ResponsesSummaryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  responses: any[];
  fields: FormField[];
}

export function ResponsesSummaryModal({
  open,
  onOpenChange,
  responses,
  fields,
}: ResponsesSummaryModalProps) {
  // Filter out content fields and hidden fields
  const inputFields = fields.filter(
    (f) =>
      f.type !== 'heading' &&
      f.type !== 'paragraph' &&
      f.type !== 'page-break' &&
      f.settings?.visible !== false
  );

  // Group fields by type for organized display
  const fieldGroups = {
    rating: inputFields.filter(
      (field) => field.type === 'star-rating' || field.type === 'number-rating'
    ),
    choice: inputFields.filter((field) =>
      ['select', 'multi-select', 'dropdown', 'checkbox'].includes(field.type)
    ),
    text: inputFields.filter((field) =>
      ['text', 'textarea', 'email', 'phone', 'url'].includes(field.type)
    ),
    time: inputFields.filter((field) => field.type === 'time'),
    date: inputFields.filter((field) => field.type === 'date'),
    other: inputFields.filter(
      (field) =>
        ![
          'star-rating',
          'number-rating',
          'select',
          'multi-select',
          'dropdown',
          'checkbox',
          'text',
          'textarea',
          'email',
          'phone',
          'url',
          'time',
          'date',
        ].includes(field.type)
    ),
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 w-8/12 max-h-[90vh] flex flex-col gap-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-base">Responses summary</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-8">
            <ResponseStats responses={responses} />

            {inputFields.map((field) => {
              if (
                field.type === 'star-rating' ||
                field.type === 'number-rating'
              ) {
                return (
                  <div key={field.id} className="space-y-4">
                    <h3 className="text-lg font-medium">{field.label}</h3>
                    <CompletionMetrics field={field} responses={responses} />
                    <RatingChart
                      field={field}
                      responses={responses}
                      className="h-64"
                    />
                  </div>
                );
              }

              if (
                ['select', 'multi-select', 'dropdown', 'checkbox'].includes(
                  field.type
                )
              ) {
                return (
                  <div key={field.id} className="space-y-4">
                    <h3 className="text-lg font-medium">{field.label}</h3>
                    <CompletionMetrics field={field} responses={responses} />
                    <ChoiceChart
                      field={field}
                      responses={responses}
                      className="h-64"
                    />
                  </div>
                );
              }

              if (field.type === 'time') {
                return (
                  <TimeSummary
                    key={field.id}
                    field={field}
                    responses={responses}
                  />
                );
              }

              if (field.type === 'date') {
                return (
                  <DateSummary
                    key={field.id}
                    field={field}
                    responses={responses}
                  />
                );
              }

              if (
                ['text', 'textarea', 'email', 'phone', 'url'].includes(
                  field.type
                )
              ) {
                return (
                  <TextSummary
                    key={field.id}
                    field={field}
                    responses={responses}
                  />
                );
              }

              // Other field types
              return (
                <div key={field.id} className="space-y-4">
                  <h3 className="text-lg font-medium">{field.label}</h3>
                  <CompletionMetrics field={field} responses={responses} />
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
