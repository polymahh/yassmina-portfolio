import React from "react"
import Link from "next/link"
import { NextResponse } from "next/server"
import { Client } from "@notionhq/client"
import axios from "axios"

import Projects from "@/components/projects/Projects"

const notionSecret = process.env.NOTION_SECRET
const projectsDB = process.env.NOTION_DB_PROJECTS as string

const notion = new Client({ auth: notionSecret })

async function getProjects() {
  if (!notionSecret || !projectsDB) {
    return NextResponse.json(
      { message: "missing secret or database id" },
      { status: 500 }
    )
  }
  try {
    const query = await notion.databases.query({
      database_id: projectsDB,
    })

    const structuredData = query.results.map((project: any) => {
      const slideKeys = Object.keys(project?.properties)
        .filter((key) => key.includes("slide"))
        .sort(
          (a, b) =>
            parseInt(a.split("slide")[1]) - parseInt(b.split("slide")[1])
        )
      const slides = slideKeys
        .map(
          (key) => project.properties[key]?.[project.properties[key].type][0]
        )
        .filter((item) => item != null)

      return {
        title: project?.properties?.title?.title[0]?.plain_text,
        location: project?.properties?.location?.rich_text[0]?.plain_text,
        preview: project?.properties?.preview?.files[0]?.file?.url,
        slides: slides,
      }
    })

    return structuredData
  } catch (error) {
    console.log(error)
  }
}

export const dynamic = "force-static"
async function page() {
  const data = await getProjects()
  return (
    <section className="container flex h-full flex-col justify-between gap-6 pb-8 pt-6 md:py-10">
      <Projects data={data} />
    </section>
  )
}

export default page
