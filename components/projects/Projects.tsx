"use client"

import React, { useState } from "react"

import { Button, buttonVariants } from "../ui/button"
import ProjectCarousel from "./ProjectCarousel"
import ProjectIndex from "./ProjectIndex"

function Projects({ data }: any) {
  const [index, setIndex] = useState(true)
  console.log(data)
  return (
    <div className="flex h-full flex-col justify-between">
      {index ? (
        <ProjectIndex data={data.data} />
      ) : (
        <ProjectCarousel data={data.data} />
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
    </div>
  )
}

export default Projects
