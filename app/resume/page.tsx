import React from "react"
import Image from "next/image"
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

    return structuredData
  } catch (error) {
    console.log(error)
  }
}

export const dynamic = "force-static"
async function page() {
  const resume = await getResume()
  console.log("🚀 ~ file: page.tsx:56 ~ page ~ getResume:", resume)

  return (
    <section className="pt:8 container flex max-w-[1116px] flex-wrap-reverse justify-between  gap-6 pb-8 md:flex-nowrap md:pt-20 ">
      <div className="flex  flex-col items-start justify-center ">
        <h1 className="font-lamore text-4xl uppercase">
          Hi, I&apos;m Yasmina
          <br />
          El Alaoui Ismaili,
        </h1>
        <p className=" max-w-[544px] pb-12 pt-6 text-sm leading-7	">
          an architect based in Tangier. I specialize in innovative designs that
          seamlessly blend form and function. With a strong foundation in
          architectural principles and a commitment to excellence, I bring a
          fresh perspective to every project.
          <br />
          My keen eye for detail and proficiency in design tools make me a
          valuable asset in creating unique and impactful spaces.
        </p>
        <Button
          className={buttonVariants({
            variant: "square",
          })}
        >
          <Download />{" "}
          <span className="pl-2 font-light">Download my resume</span>
        </Button>
      </div>
      <div>
        <Image src={"/images/agent.png"} alt="girl" width={434} height={655} />
      </div>
    </section>
  )
}

export default page
