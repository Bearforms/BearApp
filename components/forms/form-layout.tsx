'use client';

import { cn } from '@/lib/utils';

interface FormLayoutProps {
  children: React.ReactNode;
  themeSettings?: {
    coverType: 'none' | 'color' | 'image';
    coverColor?: string;
    coverImage?: string;
    showLogo: boolean;
    logo?: string;
  };
}

export function FormLayout({ children, themeSettings }: FormLayoutProps) {
  const hasCover = themeSettings?.coverType !== 'none';
  const showLogo = themeSettings?.showLogo;
  const hasLogo = showLogo && themeSettings?.logo;

  return (
    <>
      {hasCover && (
        <div className="w-full h-40">
          <div
            className="w-full h-full"
            style={{
              backgroundColor:
                themeSettings?.coverType === 'color'
                  ? themeSettings.coverColor
                  : undefined,
              backgroundImage:
                themeSettings?.coverType === 'image' && themeSettings.coverImage
                  ? `url(${themeSettings.coverImage})`
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
          !hasCover && showLogo && 'pt-52', // More space when no cover
          hasCover && showLogo && 'pt-20',
          !showLogo && 'pt-20'
        )}
      >
        {showLogo && (
          <div
            className={cn('absolute left-5', hasCover ? '-top-12' : 'top-20')}
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm bg-white">
              {themeSettings?.logo ? (
                <img
                  src={themeSettings.logo}
                  alt="Form logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-neutral-100" />
              )}
            </div>
          </div>
        )}

        {children}
      </div>
    </>
  );
}
