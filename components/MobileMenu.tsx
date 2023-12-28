import { config } from "process"
import React from "react"
import Link from "next/link"
import { Instagram, Linkedin, Twitter } from "lucide-react"

import { siteConfig } from "@/config/site"

function MobileMenu() {
  return (
    <div className="bg-popover flex  justify-center absolute h-screen w-screen top-0 left-0">
      <div className=" p-12 w-full container flex justify-between items-end">
        <div className="flex flex-col gap-2  pb-6">
          <span className="text-xl">(+212) 634 259 698</span>
          <span className="text-xl">Hello@Yasmina.com</span>
          <div className="flex gap-4 pt-8">
            <Linkedin />
            <Instagram />
            <Twitter />
          </div>
        </div>
        <div className="flex flex-col gap-8 text-6xl  mb-[108px]">
          {siteConfig.mainNav.map(
            (item, index) =>
              item.href && (
                <Link key={index} href={item.href} className="capitalize">
                  {item.title}
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
