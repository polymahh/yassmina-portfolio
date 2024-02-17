'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import * as React from 'react';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  return (
    <NextThemesProvider {...props}>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools /> */}
        {children}
      </QueryClientProvider>
    </NextThemesProvider>
  );
}
