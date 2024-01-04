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

function MobileMenu({ open, setOpen }: { open: boolean; setOpen: any }) {
  return (
    <motion.div
      className="absolute -right-0 top-0 bottom-0 flex h-svh w-svw justify-center  overflow-hidden bg-popover"
      // className="bg-red-500  flex justify-center absolute top-0 left-0 bottom-0"
      variants={menuAnimation}
      animate={open ? "open" : "closed"}
      initial="rest"
    >
      <div className=" container absolute flex  h-full w-full flex-col-reverse items-end p-12  md:flex-row md:justify-between">
        <div className="flex flex-col gap-2  pb-6">
          <span className="text-xl">(+212) 698 187 514</span>
          <span className="text-xl">elalaouiyasmina@gmail.com</span>
          <div className="flex gap-4 pt-8">
            <Link href="https://www.instagram.com/yas.dwg" target="_blank">
              <Linkedin />
            </Link>
            <Link href="https://www.instagram.com/yas.dwg" target="_blank">
              <Instagram />
            </Link>
          </div>
        </div>
        <div className="mb-[108px] flex flex-col gap-8  text-6xl">
          {siteConfig.mainNav.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className="capitalize"
                  onClick={() => setOpen(false)}
                >
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
