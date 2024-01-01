"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
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

const headerAnimation = {
  rest: {
    opacity: 0,
    y: 20,
  },
  motion: {
    opacity: 1,
    y: 0,
    trasition: {
      duration: 2,
      type: "tween",
      ease: "easeOut",
    },
  },
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
    <motion.div
      className="flex w-full justify-between gap-6 md:gap-10"
      variants={headerAnimation}
      initial="rest"
      animate={"motion"}
    >
      <Link href="/" className="z-40 flex items-center space-x-2">
        <Image src="/logo_black.png" alt="logo" height={36} width={146} />
      </Link>

      {items?.length ? (
        <motion.nav className="flex items-center gap-16 ">
          {items?.map(
            (item, index) =>
              item.href && (
                <motion.div className="hidden md:flex">
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
                </motion.div>
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
        </motion.nav>
      ) : null}
      <MobileMenu open={open} />
    </motion.div>
  )
}
