'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ButtonSettings } from '@/types/button';
import { ThemeSettings } from '@/types/form';

interface FormSubmitButtonProps {
  onEdit?: () => void;
  settings?: ButtonSettings;
  onSettingsChange?: (settings: ButtonSettings) => void;
  preview?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  themeSettings?: ThemeSettings;
}

const defaultSettings: ButtonSettings = {
  label: 'Submit',
  size: 'default',
  fullWidth: false,
  variant: 'default',
};

export function FormSubmitButton({
  onEdit,
  settings = defaultSettings,
  onSettingsChange,
  preview = false,
  isLoading = false,
  disabled = false,
  className,
  style,
  themeSettings,
}: FormSubmitButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const buttonClasses = cn(
    'transition-colors hover:opacity-90 bg-[var(--form-primary)] hover:bg-[var(--form-primary)] form-body',
    {
      'h-9 px-3 text-sm': settings?.size === 'sm',
      'h-10 px-4 text-base': settings?.size === 'default',
      'h-11 px-6 text-base': settings?.size === 'lg',
      'w-full': settings?.fullWidth,
      'w-auto': !settings?.fullWidth,
      'opacity-50 cursor-not-allowed': disabled,
    },
    className
  );

  const buttonStyles = {
    borderRadius: themeSettings ? 'var(--form-radius)' : undefined,
    ...style,
  } as React.CSSProperties;

  if (preview) {
    return (
      <div className={settings?.fullWidth ? 'w-full' : 'w-auto'}>
        <Button
          type="submit"
          className={buttonClasses}
          style={buttonStyles}
          disabled={isLoading || disabled}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {settings?.label || defaultSettings.label}
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'group relative p-3 transition-colors',
        isHovered && 'bg-[hsl(var(--muted))] rounded-md',
        settings?.fullWidth ? 'w-full' : 'w-auto'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        type="button"
        className={buttonClasses}
        style={buttonStyles}
        disabled={disabled}
      >
        {settings?.label || defaultSettings.label}
      </Button>

      {onEdit && (
        <div
          className={cn(
            'absolute -top-9 right-0 flex items-center gap-1 opacity-0 transition-opacity bg-white border-[0.5px] border-neutral-200 shadow-sm rounded-md overflow-hidden p-0',
            'group-hover:opacity-100'
          )}
        >
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-none"
            onClick={onEdit}
          >
            <Settings2 className="h-5 w-5 text-neutral-500" />
          </Button>
        </div>
      )}
    </div>
  );
}
