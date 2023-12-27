import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import { Button, buttonVariants } from "./ui/button"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex justify-between w-full gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
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
                  // className={cn(
                  //   "flex items-center text-sm font-medium text-muted-foreground uppercase ",
                  //   item.disabled && "cursor-not-allowed opacity-80"
                  // )}
                  className={buttonVariants({
                    variant: "link",
                    size: "link",
                    className: " uppercase ",
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
              className: "h-8 p-0 ",
            })}
          >
            <Menu className="w-6 " />
          </Button>
        </nav>
      ) : null}
    </div>
  )
}
