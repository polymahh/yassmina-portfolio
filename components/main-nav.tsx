"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useTheme } from "next-themes"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import MobileMenu from "./MobileMenu"
import { Button, buttonVariants } from "./ui/button"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const [open, setOpen] = React.useState(false)
  const path = usePathname()

  const { setTheme, theme } = useTheme()

  setTheme("light")

  const openMenu = () => {
    setOpen((prev) => !prev)
  }
  return (
    <div className="flex justify-between w-full gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2 z-40">
        <Image src="/logo_black.png" alt="logo" height={36} width={146} />
      </Link>

      {items?.length ? (
        <nav className="flex gap-16 items-center ">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={buttonVariants({
                    variant: "link",
                    size: "link",
                    className: `uppercase ${
                      path.includes(item.title.toLowerCase())
                        ? "underline"
                        : "text-muted-foreground"
                    }`,
                  })}
                >
                  {item.title}
                </Link>
              )
          )}
          <Button
            className={buttonVariants({
              variant: "link",
              size: "icon",
              className: "h-8 p-0 z-50 ",
            })}
            onClick={openMenu}
          >
            {open ? <X className="w-8 " /> : <Menu className="w-8 " />}
          </Button>
        </nav>
      ) : null}
      {open ? <MobileMenu /> : null}
    </div>
  )
}
