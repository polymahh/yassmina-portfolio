import { config } from "process"
import React from "react"
import Link from "next/link"
import { animate, motion } from "framer-motion"
import { Instagram, Linkedin, Twitter } from "lucide-react"

import { siteConfig } from "@/config/site"

const menuAnimation = {
  closed: {
    clipPath: "circle(1px at calc(100% - 0px) 0px)",

    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 10px) 10px)`,
    transition: {
      duration: 1.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  }),
}

function MobileMenu({ open }: { open: boolean }) {
  return (
    <motion.div
      className="bg-popover overflow-hidden flex justify-center absolute w-svw h-svh  top-0 -right-0"
      // className="bg-red-500  flex justify-center absolute top-0 left-0 bottom-0"
      variants={menuAnimation}
      animate={open ? "open" : "closed"}
      initial="rest"
    >
      <div className=" p-12 absolute h-full  w-full container flex flex-col-reverse md:flex-row  md:justify-between items-end">
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
    </motion.div>
  )
}

export default MobileMenu
