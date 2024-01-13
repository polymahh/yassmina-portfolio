"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { AnimatePresence, motion } from "framer-motion"

import { getProjects } from "@/lib/requests"

import Loading from "../Loading"
import { Button, buttonVariants } from "../ui/button"
import ProjectIndex from "./ProjectIndex"
import ProjectsCarousel from "./ProjectsCarousel"

function Projects() {
  const [index, setIndex] = useState(false)
  const [loading, setLoading] = useState(true)

  const params = useSearchParams()
  const loaded = params.get("loaded")

  useEffect(() => {
    if (loaded === "true") {
      setLoading(false)
    }
  }, [])

  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  })

  return (
    <AnimatePresence>
      <div className="flex h-full flex-col md:gap-6">
        {index ? (
          <ProjectIndex data={data?.structuredData} />
        ) : (
          <>
            <ProjectsCarousel data={data?.structuredData} />
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
      </div>
      {loading && (
        <motion.div
          className="absolute top-0 z-20 overflow-hidden w-full h-full hidden md:block"
          key={"loader"}
        >
          <Loading
            setLoading={setLoading}
            centerImageSrc={data?.structuredData[0].preview}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Projects
