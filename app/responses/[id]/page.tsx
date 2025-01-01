'use client';

import { useParams } from 'next/navigation';
import { FormPageLayout } from '@/components/forms/layout/form-page-layout';
import { ResponsesTable } from '@/components/responses/responses-table';

export default function ResponsesPage() {
  const params = useParams();
  const formId = params.id as string;

  return (
    <FormPageLayout formId={formId}>
      <ResponsesTable />
    </FormPageLayout>
  );
}