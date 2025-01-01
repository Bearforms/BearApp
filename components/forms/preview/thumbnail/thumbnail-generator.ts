'use client';

import { FormField, ThemeSettings } from '@/types/form';

interface ThumbnailOptions {
  canvas: HTMLCanvasElement;
  title: string;
  description?: string;
  fields: FormField[];
  themeSettings: ThemeSettings;
}

export function generateThumbnail({
  canvas,
  title,
  description,
  fields,
  themeSettings
}: ThumbnailOptions) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Set canvas size (higher resolution for better quality)
  canvas.width = 800;
  canvas.height = 600;

  // Set background
  ctx.fillStyle = themeSettings.colors.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw cover if enabled
  if (themeSettings.coverType === 'color' && themeSettings.coverColor) {
    ctx.fillStyle = themeSettings.coverColor;
    ctx.fillRect(0, 0, canvas.width, 160);
  }

  // Configure text styles
  ctx.textBaseline = 'top';
  
  // Draw title
  ctx.font = `bold 24px ${themeSettings.fonts.heading}`;
  ctx.fillStyle = themeSettings.colors.text;
  ctx.fillText(truncateText(title, 30), 40, 200);

  // Draw description
  if (description) {
    ctx.font = `14px ${themeSettings.fonts.body}`;
    ctx.fillStyle = themeSettings.colors.textSecondary;
    ctx.fillText(truncateText(description, 50), 40, 240);
  }

  // Draw form fields preview
  const previewFields = fields.filter(f => 
    !['heading', 'paragraph', 'page-break'].includes(f.type)
  ).slice(0, 3);

  let yOffset = 300;
  previewFields.forEach((field, index) => {
    drawFieldPreview(ctx, field, yOffset, themeSettings);
    yOffset += 80;
  });
}

function drawFieldPreview(
  ctx: CanvasRenderingContext2D, 
  field: FormField,
  y: number,
  themeSettings: ThemeSettings
) {
  // Draw field label
  ctx.font = `14px ${themeSettings.fonts.body}`;
  ctx.fillStyle = themeSettings.colors.text;
  ctx.fillText(truncateText(field.label, 40), 40, y);

  // Draw field input box
  ctx.strokeStyle = themeSettings.colors.border;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(40, y + 25, 720, 40, 8);
  ctx.stroke();

  // Draw placeholder text
  ctx.font = `14px ${themeSettings.fonts.body}`;
  ctx.fillStyle = themeSettings.colors.textSecondary;
  ctx.fillText(
    truncateText(field.placeholder || `Enter ${field.type}`, 40),
    50,
    y + 38
  );
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}