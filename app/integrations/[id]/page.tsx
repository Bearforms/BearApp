'use client';

import { useParams } from 'next/navigation';
import { FormPageLayout } from '@/components/forms/layout/form-page-layout';
import { IntegrationsContent } from '@/components/integrations/integrations-content';

export default function FormIntegrationsPage() {
  const params = useParams();
  const formId = params.id as string;

  return (
    <FormPageLayout formId={formId}>
      <IntegrationsContent formId={formId} />
    </FormPageLayout>
  );
}