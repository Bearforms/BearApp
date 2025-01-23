'use client';

import { useParams } from 'next/navigation';
import { useFormStore } from '@/stores/form-store';
import { Sidebar } from '@/components/layout/sidebar';
import { HeadingField } from '@/components/forms/fields/heading-field';
import { ParagraphField } from '@/components/forms/fields/paragraph-field';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { FormField } from '@/types/form';

export default function ThankYouPage() {
  const params = useParams();
  const form = useFormStore((state) =>
    state.forms.find((f) => f.id === params.id && !f.deletedAt)
  );

  if (!form) {
    return null;
  }

  const headingField = {
    id: 'thank-you-heading',
    type: 'heading' as const,
    label: 'Thank You',
    content: 'Thank you for your submission',
    settings: {
      headingLevel: 1,
    },
  };

  const paragraphField = {
    id: 'thank-you-paragraph',
    type: 'paragraph' as const,
    label: 'Message',
    content: 'Your response has been recorded. We appreciate your time.',
  };

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-6 h-12">
          <Link
            href={`/app/${params.workspaceSlug}`}
            className="text-sm text-neutral-500 hover:text-neutral-900"
          >
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Forms
            </Button>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[640px] mx-auto px-5 py-12">
            <div className="space-y-6">
              <HeadingField field={headingField as FormField} preview />
              <ParagraphField field={paragraphField} preview />
              <div className="pt-4">
                <Link href={`/app/${params.workspaceSlug}`}>
                  <Button>Create Another Form</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
