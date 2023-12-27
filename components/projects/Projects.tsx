"use client"

import React from "react"

import { Button, buttonVariants } from "../ui/button"
import ProjectIndex from "./ProjectIndex"

function Projects() {
  return (
    <div className="flex h-full flex-col justify-between">
      <ProjectIndex />
      <div className="flex gap-4 ">
        <Button
          className={buttonVariants({
            size: "link",
            variant: "link",
            className: "uppercase",
          })}
        >
          index
        </Button>
        <Button
          className={buttonVariants({
            size: "link",
            variant: "link",
            className: "uppercase",
          })}
        >
          galirie
        </Button>
      </div>
    </div>
  )
}

export default Projects
