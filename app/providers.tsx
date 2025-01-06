'use client';

import { ThemeProvider } from 'next-themes';
import { useKeyboardNavigation } from '@/hooks/use-keyboard-navigation';
import { useEffect } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode; }) {
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
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}