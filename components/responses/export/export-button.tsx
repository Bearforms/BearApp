'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { convertToCSV, downloadCSV } from '@/lib/utils/csv';
import { format } from 'date-fns';

interface ExportButtonProps {
  responses: any[] | undefined;
  fields: any[] | undefined;
  formName: string;
}

export function ExportButton({ responses = [], fields = [], formName }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!responses || !fields || responses.length === 0) {
      toast({
        title: 'No data to export',
        description: 'There are no responses to export',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsExporting(true);

      // Generate CSV content
      const csvContent = convertToCSV(responses, fields);

      // Generate filename with current date
      const timestamp = format(new Date(), 'yyyy-MM-dd');
      const sanitizedFormName = formName.toLowerCase().replace(/[^a-z0-9]+/g, '_');
      const filename = `${sanitizedFormName}_responses_${timestamp}.csv`;

      // Download the file
      downloadCSV(csvContent, filename);

      toast({ description: 'Responses exported successfully' });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: 'Export failed',
        description: 'There was an error exporting the responses',
        variant: 'destructive'
      });
    } finally {
      setIsExporting(false);
    }
  };

  const hasResponses = responses && responses.length > 0;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      disabled={isExporting || !hasResponses}
      className="gap-2"
    >
      {isExporting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      Export CSV
    </Button>
  );
}