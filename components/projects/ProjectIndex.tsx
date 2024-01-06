import React from "react"

import ProjectCard from "./ProjectCard"
import { projectType } from "./type"

function ProjectList({
  data,
  setPage,
  setShowPage,
}: {
  data: projectType[]
  setPage: any
  setShowPage: any
}) {
  console.log(data)

  const handleClick = (idx: number) => {
    console.log(idx)
    setPage(idx)
    setShowPage(true)
  }
  return (
    <div className="flex flex-col gap-4 grow">
      {data?.map((card: projectType, idx: number) => {
        return (
          <ProjectCard
            key={card.title}
            card={card}
            handleClick={handleClick}
            idx={idx}
          />
        )
      })}
      <div className="h-[800px] bg-red-500 w-2"></div>
    </div>
  )
}

export default ProjectList
