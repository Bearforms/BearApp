'use client';

import { FormField, ThemeSettings } from '@/types/form';
import { useEffect, useRef } from 'react';
import { useFormTheme } from '@/hooks/use-form-theme';
import { generateThumbnail } from './thumbnail-generator';
import { ThumbnailSkeleton } from './thumbnail-skeleton';

interface FormPreviewThumbnailProps {
  title: string;
  description?: string;
  fields: FormField[];
  themeSettings?: Partial<ThemeSettings>;
}

export function FormPreviewThumbnail({
  title,
  description,
  fields,
  themeSettings = {},
}: FormPreviewThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { themeSettings: mergedSettings } = useFormTheme(themeSettings);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    generateThumbnail({
      canvas,
      title,
      description,
      fields,
      themeSettings: mergedSettings,
    });
  }, [title, description, fields, mergedSettings]);

  return (
    <div className="relative w-full aspect-[4/3] bg-white">
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
      />
      <ThumbnailSkeleton />
    </div>
  );
}