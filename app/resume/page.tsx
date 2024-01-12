import React from "react"
import Image from "next/image"
import Link from "next/link"
import { NextResponse } from "next/server"
import { Client } from "@notionhq/client"
import { QueryClient } from "@tanstack/react-query"
import { Download } from "lucide-react"

import { getProjects } from "@/lib/requests"
import { Button, buttonVariants } from "@/components/ui/button"
import { projectType } from "@/components/projects/type"

const notionSecret = process.env.NOTION_SECRET
const projectsDB = process.env.NOTION_DB_RESUME as string

const notion = new Client({ auth: notionSecret })
interface resumeType {
  title: String
  description: String
  cv: String
  image: String
}

interface dataType {
  resume: resumeType
  structuredData: projectType
}

// export const dynamic = "force-static"
async function page() {
  const queryClient = new QueryClient()
  const data = await queryClient.ensureQueryData({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  })
  const resume = data?.resume
  return (
    <section className="pt:8 container flex max-w-[1116px] h-full flex-wrap-reverse justify-between  gap-6 pb-8 md:flex-nowrap md:pt-20 overflow-auto">
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
          href={resume?.cv as string}
          download
        >
          <Download />{" "}
          <span className="pl-2 font-light">Download my resume</span>
        </Link>
      </div>
      <div className="flex justify-end ">
        <Image
          src={resume?.image as string}
          alt="picture"
          objectFit="contain"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "auto",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    </section>
  )
}

export default page
