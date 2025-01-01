'use client';

import { ThemeProvider } from 'next-themes';
import { useKeyboardNavigation } from '@/hooks/use-keyboard-navigation';
import { useEffect } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const isKeyboardNavigation = useKeyboardNavigation();

  useEffect(() => {
    document.body.classList.toggle('using-keyboard', isKeyboardNavigation);
  }, [isKeyboardNavigation]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableColorScheme={false}
      // enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}