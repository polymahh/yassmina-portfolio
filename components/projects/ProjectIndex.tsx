import React from "react"

import ProjectCard from "./ProjectCard"
import { projectType } from "./type"

function ProjectList({ data }: { data: projectType[] }) {
  console.log(data)
  return (
    <div className="flex flex-col gap-9">
      {data.map((card: projectType) => {
        return <ProjectCard key={card.title} card={card} />
      })}
    </div>
  )
}

export default ProjectList
