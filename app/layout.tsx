import "@/styles/globals.css"
import { Metadata } from "next"
import localFont from "next/font/local"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { getProjects } from "@/lib/requests"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

const lamore = localFont({
  src: [
    {
      path: "font/lamore/LAMORELight.woff",
      weight: "300",
      style: "light",
    },
    {
      path: "font/lamore/LAMORERegular.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "font/lamore/LAMORERegular.woff",
      weight: "400",
      style: "regular",
    },
  ],
  variable: "--font-lamore",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  })
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            lamore.className,
            lamore.variable,
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="light">
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />

              <HydrationBoundary state={dehydrate(queryClient)}>
                <div className=" h-[calc(100vh-112px)] ">{children}</div>
              </HydrationBoundary>
            </div>
            {/* <TailwindIndicator /> */}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
