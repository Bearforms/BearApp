'use client';

import { memo } from 'react';
import { BaseHeader } from './base-header';
import { FormHeaderActions } from './form-header-actions';
import { FormNav } from './form-nav';

interface FormHeaderProps {
  title?: string;
  showNav?: boolean;
  onThemeSettingsOpen?: () => void;
  onPreviewOpen?: () => void;
  onShareOpen?: () => void;
  onSettingsOpen?: () => void;
}

export const FormHeader = memo(function FormHeader({
  title,
  showNav = true,
  onThemeSettingsOpen,
  onPreviewOpen,
  onShareOpen,
  onSettingsOpen,
}: FormHeaderProps) {
  return (
    <BaseHeader title={title || 'Form'}>
      {showNav && (
        <div className="w-1/3 flex justify-center">
          <FormNav />
        </div>
      )}
      <div className="w-1/3 flex justify-end">
        <FormHeaderActions
          onThemeSettingsOpen={onThemeSettingsOpen}
          onPreviewOpen={onPreviewOpen}
          onShareOpen={onShareOpen}
          onSettingsOpen={onSettingsOpen}
        />
      </div>
    </BaseHeader>
  );
});