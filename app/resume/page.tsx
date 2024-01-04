import React from "react"
import Image from "next/image"
import Link from "next/link"
import { NextResponse } from "next/server"
import { Client } from "@notionhq/client"
import { Download } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"

const notionSecret = process.env.NOTION_SECRET
const projectsDB = process.env.NOTION_DB_RESUME as string

const notion = new Client({ auth: notionSecret })

async function getResume() {
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
      return {
        title: project?.properties?.title?.title[0]?.plain_text,
        cv: project?.properties?.cv?.files[0]?.file?.url,
        description: project?.properties?.description?.rich_text[0]?.plain_text,
        image: project?.properties?.image?.files[0]?.file?.url,
      }
    })

    return structuredData[0]
  } catch (error) {
    console.log(error)
  }
}

interface resumeType {
  title: String
  description: String
  cv: String
  image: String
}
export const dynamic = "force-static"
async function page() {
  const resume = await getResume()
  console.log("🚀 ~ file: page.tsx:56 ~ page ~ getResume:", resume)

  return (
    <section className="pt:8 container flex max-w-[1116px] flex-wrap-reverse justify-between  gap-6 pb-8 md:flex-nowrap md:pt-20 ">
      <div className="flex  flex-col items-start justify-center ">
        <h1 className="font-lamore text-4xl uppercase">
          Hi, I&apos;m YASMINA
          <br /> EL ALAOUI ISMAILI
        </h1>
        <p className=" max-w-[544px] pb-12 pt-6 text-sm leading-7	">
          {resume?.description}
        </p>
        <Link
          className={buttonVariants({
            variant: "square",
          })}
          href={resume?.cv}
          download
        >
          <Download />{" "}
          <span className="pl-2 font-light">Download my resume</span>
        </Link>
      </div>
      <div>
        <Image src={resume?.image} alt="picture" width={434} height={655} />
      </div>
    </section>
  )
}

export default page
