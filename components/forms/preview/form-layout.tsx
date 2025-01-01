'use client';

import { cn } from '@/lib/utils';
import { useFormTheme } from '@/hooks/use-form-theme';
import { ThemeSettings } from '@/types/form';

interface FormLayoutProps {
  children: React.ReactNode;
  themeSettings?: Partial<ThemeSettings>;
}

export function FormLayout({ children, themeSettings = {} }: FormLayoutProps) {
  const { themeSettings: mergedSettings, getThemeStyles } =
    useFormTheme(themeSettings);
  const styles = getThemeStyles();
  const hasCover = mergedSettings.coverType !== 'none';
  const showLogo = mergedSettings.showLogo && mergedSettings.logo;

  return (
    <div className="form-theme" style={styles.container}>
      {hasCover && (
        <div className="w-full h-40">
          <div
            className="w-full h-full"
            style={{
              backgroundColor:
                mergedSettings.coverType === 'color'
                  ? mergedSettings.coverColor
                  : undefined,
              backgroundImage:
                mergedSettings.coverType === 'image' &&
                mergedSettings.coverImage
                  ? `url(${mergedSettings.coverImage})`
                  : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
      )}

      <div
        className={cn(
          'max-w-[640px] mx-auto px-6 pb-12 relative',
          !hasCover && showLogo && 'pt-52',
          hasCover && showLogo && 'pt-24',
          !showLogo && 'pt-16'
        )}
      >
        {showLogo && (
          <div
            className={cn('absolute left-5', hasCover ? '-top-12' : 'top-16')}
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm bg-white">
              <img
                src={mergedSettings.logo}
                alt="Form logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
