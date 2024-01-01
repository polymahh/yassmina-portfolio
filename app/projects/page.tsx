import React from "react"
import Link from "next/link"
import axios from "axios"

import Projects from "@/components/projects/Projects"

async function page() {
  const responce = await axios
    .get(`${process.env.BASE_URL}/api/projects`)
    .catch((err) => console.log(err))
  console.log("🚀 ~ file: page.tsx:11 ~ page ~ data:", responce)
  return (
    <section className="container flex h-full flex-col justify-between gap-6 pb-8 pt-6 md:py-10">
      <Projects data={responce?.data} />
    </section>
  )
}

export default page
