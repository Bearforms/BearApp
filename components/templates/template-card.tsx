'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStore } from '@/stores/form-store';
import { Button } from '@/components/ui/button';
import { nanoid } from 'nanoid';
import { FormPreviewThumbnail } from '@/components/forms/form-preview-thumbnail';
import { Copy, Eye } from 'lucide-react';
import { TemplatePreview } from './template-preview';
import { templateCategories } from '@/lib/constants/form-templates';
import { Form } from '@/types/form';

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    fields: any[];
    themeSettings?: {
      coverType: 'none' | 'color' | 'image';
      coverColor?: string;
      coverImage?: string;
      showLogo: boolean;
      logo?: string;
    };
  };
}

export function TemplateCard({ template }: TemplateCardProps) {
  const router = useRouter();
  const addForm = useFormStore((state) => state.addForm);
  const [showPreview, setShowPreview] = useState(false);

  const handleUseTemplate = () => {
    const newForm = {
      id: nanoid(),
      name: template.name,
      title: template.name,
      description: template.description,
      responses: 0,
      lastUpdated: new Date().toISOString(),
      fields: template.fields,
      themeSettings: template.themeSettings || {
        coverType: 'none',
        showLogo: true,
        coverColor: '#f3f4f6',
        coverImage: '',
        logo: '',
      },
    };

    addForm(newForm as Form);
    router.push(`/edit/${newForm.id}`);
  };

  const category = templateCategories.find((c) => c.id === template.categoryId);

  return (
    <div className="group relative flex flex-col h-full">
      <div
        className="relative bg-white p-0 rounded-md border border-neutral-200 hover:border-neutral-300 transition-colors overflow-hidden cursor-pointer"
        onClick={() => setShowPreview(true)}
      >
        <FormPreviewThumbnail
          title={template.name}
          description={template.description}
          fields={template.fields}
          themeSettings={template.themeSettings}
        />
      </div>
      <div className="pt-3 space-y-0.5">
        <h3 className="text-base font-medium text-neutral-900">
          {template.name}
        </h3>
        <p className="text-sm text-neutral-500">
          {category?.name || 'Uncategorized'}
        </p>
      </div>

      <TemplatePreview
        template={template}
        open={showPreview}
        onOpenChange={setShowPreview}
        onUseTemplate={handleUseTemplate}
      />
    </div>
  );
}
