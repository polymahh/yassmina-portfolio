import React from "react"
import { useRouter } from "next/navigation"

import ProjectCard from "./ProjectCard"
import { projectType } from "./type"

function ProjectList({ data }: { data: projectType[] }) {
  const router = useRouter()

  const handleClick = (title: string) => {
    router.push(`/projects/${title.replaceAll(" ", "_")}`)
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
    </div>
  )
}

export default ProjectList
