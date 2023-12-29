import React from "react"

import { projectType } from "./type"

function ProjectCard({
  card,
  idx,
  handleClick,
}: {
  card: projectType
  idx: number
  handleClick: any
}) {
  return (
    <div
      className="flex w-full  items-center justify-between gap-2 hover:cursor-pointer"
      onClick={() => handleClick(idx)}
    >
      <h1 className="font-lamore text-4xl font-normal uppercase leading-tight tracking-tighter md:text-[54px]">
        {card.title}
      </h1>
      <span className=" text-2xl text-accent-foreground">{card.location}</span>
    </div>
  )
}

export default ProjectCard
