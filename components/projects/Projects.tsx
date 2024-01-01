"use client"

import React, { useState } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

import { Button, buttonVariants } from "../ui/button"
import ProjectCarousel from "./ProjectCarousel"
import ProjectIndex from "./ProjectIndex"
import ProjectPage from "./ProjectPage"
import { projectType } from "./type"

function Projects({ data }: any) {
  const [index, setIndex] = useState(true)
  const [showpage, setShowPage] = useState(false)
  const [page, setPage] = useState(data[0])

  return (
    <div className="flex h-full flex-col justify-between">
      {index ? (
        <ProjectIndex data={data} setPage={setPage} setShowPage={setShowPage} />
      ) : (
        <>
          <ProjectCarousel data={data} />
        </>
      )}
      <div className="flex gap-4 ">
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
          galirie
        </Button>
      </div>
      <div
        className={cn("absolute left-0 top-0", !!showpage ? "flex" : "hidden")}
      >
        <ProjectPage page={page} setShowPage={setShowPage} />
      </div>
    </div>
  )
}

export default Projects
