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
    setPage(data[idx])
    setShowPage(true)
  }
  return (
    <div className="flex flex-col gap-4">
      {data.map((card: projectType, idx: number) => {
        return (
          <ProjectCard
            key={card.title}
            card={card}
            handleClick={handleClick}
            idx={idx}
          />
        )
      })}
    </div>
  )
}

export default ProjectList
