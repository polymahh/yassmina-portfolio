"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"

import Loading from "../Loading"
import { Button, buttonVariants } from "../ui/button"
import ProjectIndex from "./ProjectIndex"
import ProjectSlide from "./ProjectSlide"
import ProjectsCarousel from "./ProjectsCarousel"

function Projects({ data }: any) {
  const [index, setIndex] = useState(false)
  const [showpage, setShowPage] = useState(false)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)

  const params = useSearchParams()
  const loaded = params.get("loaded")

  useEffect(() => {
    if (loaded === "true") {
      setLoading(false)
    }
  }, [])

  return (
    <AnimatePresence>
      <div className="flex h-full flex-col md:gap-6">
        {index ? (
          <ProjectIndex
            data={data}
            setPage={setPage}
            setShowPage={setShowPage}
          />
        ) : (
          <>
            <ProjectsCarousel
              data={data}
              setPage={setPage}
              setShowPage={setShowPage}
            />
          </>
        )}
        <div className="flex gap-4 mt-4 pl-4">
          <Button
            className={buttonVariants({
              size: "link",
              variant: "link",
              className: `uppercase ${
                index ? "underline" : "text-muted-foreground"
              }`,
            })}
            onClick={() => setIndex(true)}
          >
            index
          </Button>
          <Button
            className={buttonVariants({
              size: "link",
              variant: "link",
              className: `uppercase ${
                !index ? "underline" : "text-muted-foreground"
              }`,
            })}
            onClick={() => setIndex(false)}
          >
            gallery
          </Button>
        </div>
        <div
          className={cn(
            "absolute left-0 top-0",
            !!showpage ? "flex" : "hidden"
          )}
        >
          <ProjectSlide
            page={data?.[page]}
            nextPage={data?.[page + 1]}
            index={page}
            setPage={setPage}
            setShowPage={setShowPage}
          />
        </div>
      </div>
      {loading && (
        <motion.div
          className="absolute top-0 z-20 overflow-hidden w-full h-full hidden md:block"
          key={"loader"}
        >
          <Loading setLoading={setLoading} centerImageSrc={data[0].preview} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Projects
