'use client';

interface SettingsSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function SettingsSection({
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        {title && <h3 className="text-sm font-medium text-neutral-900">{title}</h3>}
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="pl-0.5">{children}</div>
    </div>
  );
}