import React from "react"
import Link from "next/link"
import axios from "axios"

import Projects from "@/components/projects/Projects"

const getProjects = async () => {
  const responce = await fetch(`${process.env.BASE_URL}/api/projects`, {
    cache: "force-cache",
  })

  return responce.json()
}

async function page() {
  const data = await getProjects()
  console.log("🚀 ~ file: page.tsx:11 ~ page ~ data:", data)
  return (
    <section className="container flex h-full flex-col justify-between gap-6 pb-8 pt-6 md:py-10">
      <Projects data={data} />
    </section>
  )
}

export default page
