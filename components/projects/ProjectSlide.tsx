"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { MoveLeft, X } from "lucide-react"
import {
  Swiper,
  SwiperClass,
  SwiperSlide,
  useSwiper,
  useSwiperSlide,
} from "swiper/react"

import { Button, buttonVariants } from "../ui/button"
import { projectType } from "./type"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import { useParams, usePathname, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { Mousewheel } from "swiper/modules"

import { getProjects } from "@/lib/requests"

function ProjectSlide() {
  const [mainSwiper, setMainSwiper] = useState<SwiperClass>()

  const router = useRouter()
  const pathname = usePathname()
  const projectName = pathname.split("/")[2].replaceAll("_", " ")
  console.log("🚀 ~ ProjectSlide ~ pathname:", projectName)

  const { data: fullData } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  })

  const data = fullData?.structuredData

  const pageidx = data.findIndex(
    (page: projectType) => page.title === projectName
  )
  const page = data?.[pageidx]
  console.log("🚀 ~ ProjectSlide ~ page:", page)
  const nextPage = pageidx + 1 < data.length ? data[pageidx + 1] : null

  return (
    <div className="fixed top-0 left-0 z-40  h-screen w-screen items-start justify-center overflow-hidden bg-white">
      <div className="absolute flex w-full justify-between p-3 md:p-9">
        <Button
          className={buttonVariants({
            variant: "link",
            size: "icon",
            className: " p-0 z-20 hover:bg-white",
          })}
          onClick={() => router.push("/projects?loaded=true")}
        >
          <MoveLeft />
        </Button>
        <Image
          src="/logo_black.png"
          alt="logo"
          height={36}
          width={146}
          className="z-20 hidden md:block"
        />
        <Button
          className={buttonVariants({
            variant: "link",
            size: "icon",
            className: " p-0 z-20 hidden md:flex hover:bg-white",
          })}
          onClick={() => router.push("/projects?loaded=true")}
        >
          <X />
        </Button>
      </div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        slidesPerView={"auto"}
        spaceBetween={0}
        mousewheel={{ releaseOnEdges: true, sensitivity: 0.1 }}
        modules={[Mousewheel]}
        onSwiper={setMainSwiper}
        className="mySwiper w-screen grow "
      >
        <SwiperSlide key={page?.title} className="relative max-w-[900px] ">
          <div className="absolute w-full top-0 left-0 flex max-w-[900px] h-screen  flex-col items-center justify-center  ">
            <span className=" text-2xl text-accent-foreground">
              {page?.location}
            </span>
            <h2 className="text-center font-lamore text-4xl  font-normal uppercase  md:text-[54px] ">
              {page?.title}
            </h2>
          </div>
        </SwiperSlide>
        {page?.slides.map((url: string, idx: number) => {
          return (
            <SwiperSlide key={url} className="h-svh ">
              <div className="flex h-svh relative">
                <Image
                  src={url}
                  alt={`${page.title} image`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                  priority={true}
                />
              </div>
            </SwiperSlide>
          )
        })}
        <SwiperSlide className="max-w-[900px]" style={{ height: "auto" }}>
          <div className=" w-full flex max-w-[600px] h-full  flex-col justify-between gap-4 p-4 pl-8 md:pl-24">
            <div>
              <h2 className="text-left font-lamore text-4xl cursor-pointer font-normal uppercase pb-4 pt-12 md:pt-4  ">
                {page?.title}
              </h2>
              <p className=" text-sm leading-loose text-secondary-foreground">
                {nextPage?.description}
              </p>
            </div>
            <div className="flex flex-col ">
              <div className="py-2 flex justify-between text-xs sm:text-sm border-t border-black">
                <span className="uppercase">Location</span>
                <span>{page.location}</span>
              </div>
              <div className="py-2 flex justify-between text-xs sm:text-sm border-t border-black">
                <span className="uppercase">YEAR</span>
                <span>{page.date}</span>
              </div>
              <div className="py-2 text-xs sm:text-sm flex justify-between border-t border-black">
                <span className="uppercase">Role</span>
                <span>{page.role}</span>
              </div>
              <div className="py-2 text-xs sm:text-sm  flex justify-between border-t border-black">
                <span className="uppercase">Status</span>
                <span>{page.status}</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          key={nextPage?.title}
          className="max-w-[900px]"
          style={{ height: "auto" }}
        >
          <div className=" w-full flex max-w-[900px] h-full  flex-col  justify-center gap-4 items-center ">
            <span className=" text-2xl text-secondary-foreground mb-8">
              Next Project:
            </span>
            <h2
              className="text-center font-lamore text-4xl cursor-pointer font-normal uppercase  md:text-[54px]  "
              onClick={() => {
                router.push(`/projects/${nextPage?.title.replaceAll(" ", "_")}`)
              }}
            >
              {nextPage?.title}
            </h2>
            <span className=" text-2xl text-accent-foreground">
              {nextPage?.location}
            </span>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default ProjectSlide
