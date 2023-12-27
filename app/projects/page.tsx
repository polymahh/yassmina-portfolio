import React from "react"
import Link from "next/link"

import Projects from "@/components/projects/Projects"

function page() {
  return (
    <section className="container flex h-full flex-col justify-between gap-6 pb-8 pt-6 md:py-10">
      <Projects />
    </section>
  )
}

export default page
