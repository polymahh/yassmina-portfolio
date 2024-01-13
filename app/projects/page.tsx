import React from "react"

import Projects from "@/components/projects/Projects"

async function page() {
  return (
    <section className="md:container relative flex h-full flex-col justify-between gap-6 md:pb-8 md:pt-6 md:py-10">
      <Projects />
    </section>
  )
}

export default page
