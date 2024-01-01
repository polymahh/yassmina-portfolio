import "@/styles/globals.css"
import { Metadata } from "next"
import localFont from "next/font/local"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
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

export default function RootLayout({ children }: RootLayoutProps) {
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
              <div className=" h-[calc(100vh-112px)] ">{children}</div>
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
