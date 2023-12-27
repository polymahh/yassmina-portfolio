import React from "react"

import ProjectCard from "./ProjectCard"

function ProjectList() {
  return (
    <div className="flex flex-col gap-9">
      <ProjectCard />
      <ProjectCard />
    </div>
  )
}

export default ProjectList
