import '@/styles/globals.css';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';
import localFont from 'next/font/local';

import { SiteHeader } from '@/components/site-header';
import { ThemeProvider } from '@/components/theme-provider';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/lib/fonts';
import { getProjects } from '@/lib/requests';
import { cn } from '@/lib/utils';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

const lamore = localFont({
  src: [
    {
      path: 'font/lamore/LAMORELight.woff',
      weight: '300',
      style: 'light',
    },
    {
      path: 'font/lamore/LAMORERegular.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: 'font/lamore/LAMORERegular.woff',
      weight: '400',
      style: 'regular',
    },
  ],
  variable: '--font-lamore',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  });
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn('min-h-screen bg-background font-sans antialiased', lamore.variable, fontSans.variable)}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <div className="relative flex flex-col min-h-screen">
              <SiteHeader />

              <HydrationBoundary state={dehydrate(queryClient)}>
                <div className=" h-[calc(100vh-112px)] flex flex-col">{children}</div>
              </HydrationBoundary>
            </div>
            {/* <TailwindIndicator /> */}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
