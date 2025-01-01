import { FormField, ThemeSettings } from '@/types/form';
import { cn } from '@/lib/utils';
import { useFormTheme } from '@/hooks/use-form-theme';

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
  const { getThemeStyles } = useFormTheme(themeSettings);
  const styles = getThemeStyles();

  // Get first 3 non-content fields for preview
  const previewFields = fields
    .filter(
      (f) =>
        f.type !== 'heading' &&
        f.type !== 'paragraph' &&
        f.type !== 'page-break' &&
        f.settings?.visible !== false
    )
    .slice(0, 3);

  const getFieldPreview = (field: FormField) => {
    const commonLabelClasses = cn(
      'text-[9px] font-medium truncate',
      'text-[var(--form-text)]'
    );

    const commonInputClasses = cn(
      'border rounded flex items-center px-2',
      'border-[var(--form-border)]',
      'bg-[var(--form-background)]'
    );

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'url':
        return (
          <div className="flex flex-col gap-1">
            <div className={commonLabelClasses}>{field.label}</div>
            <div className={cn(commonInputClasses, 'h-6')}>
              <div className="text-[8px] text-neutral-500 truncate">
                {field.placeholder || `Enter ${field.type}`}
              </div>
            </div>
          </div>
        );

      case 'textarea':
        return (
          <div className="flex flex-col gap-1">
            <div className={commonLabelClasses}>{field.label}</div>
            <div className={cn(commonInputClasses, 'h-[40px] p-2')}>
              <div className="text-[8px] text-neutral-500 truncate">
                {field.placeholder || 'Enter text'}
              </div>
            </div>
          </div>
        );

      case 'select':
      case 'multi-select':
      case 'dropdown':
        return (
          <div className="flex flex-col gap-1">
            <div className={commonLabelClasses}>{field.label}</div>
            <div className={cn(commonInputClasses, 'h-6 justify-between')}>
              <div className="text-[8px] text-neutral-500 truncate">
                Select option
              </div>
              <div className="h-2 w-2 transform rotate-45 translate-y-[-1px] border-r border-b border-neutral-400" />
            </div>
          </div>
        );

      case 'star-rating':
        return (
          <div className="flex flex-col gap-1">
            <div className={commonLabelClasses}>{field.label}</div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'h-4 w-4 text-[10px]',
                    'text-[var(--form-border)]'
                  )}
                >
                  ★
                </div>
              ))}
            </div>
          </div>
        );

      case 'number-rating':
        return (
          <div className="flex flex-col gap-1">
            <div className={commonLabelClasses}>{field.label}</div>
            <div className="flex gap-0.5">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'h-4 w-4 rounded flex items-center justify-center',
                    'border text-[8px]',
                    'border-[var(--form-border)]',
                    'bg-[var(--form-background)]',
                    'text-[var(--form-text)]'
                  )}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        );

      case 'file':
        return (
          <div className="flex flex-col gap-1">
            <div className={commonLabelClasses}>{field.label}</div>
            <div
              className={cn(
                commonInputClasses,
                'h-6 border-dashed justify-center'
              )}
            >
              <div className="text-[8px] text-neutral-500">Choose file</div>
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div className="flex flex-col gap-1">
            <div className={commonLabelClasses}>{field.label}</div>
            <div className="flex items-center gap-1.5">
              <div
                className={cn(
                  'h-3 w-3 rounded-[2px] border',
                  'border-[var(--form-border)]'
                )}
              />
              <div className="text-[8px] text-neutral-500 truncate">
                {field.settings?.checkboxText || 'Checkbox option'}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col gap-1">
            <div className={commonLabelClasses}>{field.label}</div>
            <div className={cn(commonInputClasses, 'h-6')} />
          </div>
        );
    }
  };

  return (
    <div
      className="w-full h-[160px] overflow-hidden form-theme relative"
      style={styles.container}
    >
      {/* Cover */}
      {themeSettings?.coverType !== 'none' && (
        <div className="inset-x-0 top-0 h-14">
          {themeSettings?.coverType === 'color' && (
            <div
              className="w-full h-full"
              style={{ backgroundColor: themeSettings.coverColor || '#f3f4f6' }}
            />
          )}
          {themeSettings?.coverType === 'image' && themeSettings.coverImage && (
            <img
              src={themeSettings.coverImage}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}

      {/* Content */}
      <div
        className={cn(
          'relative px-4 pt-4 space-y-2',
          themeSettings?.showLogo &&
            themeSettings?.coverType !== 'none' &&
            'pt-2'
        )}
      >
        {/* Logo */}
        {themeSettings?.showLogo && themeSettings?.logo && (
          <div
            className={cn(
              'left-3.5 w-7 h-7 rounded-full bg-white border-[1.5px] border-white shadow-sm overflow-hidden',
              themeSettings?.coverType !== 'none'
                ? 'absolute -top-3.5'
                : 'top-4'
            )}
          >
            <img
              src={themeSettings.logo}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div
          className={cn(
            'space-y-2 pt-0',
            themeSettings?.coverType == 'none' ? 'pt-0' : 'pt-2'
          )}
        >
          {/* Title and Description */}
          <div className="space-y-1">
            <div
              className={cn(
                'text-[11px] font-medium leading-tight line-clamp-1 form-heading',
                'text-[var(--form-text)]'
              )}
            >
              {title}
            </div>
            {description && (
              <div
                className={cn(
                  'text-[8px] leading-tight line-clamp-2 form-body',
                  'text-[var(--form-text)]'
                )}
              >
                {description}
              </div>
            )}
          </div>

          {/* Fields */}
          <div className="space-y-2 mt-1">
            {previewFields.map((field) => (
              <div key={field.id}>{getFieldPreview(field)}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
