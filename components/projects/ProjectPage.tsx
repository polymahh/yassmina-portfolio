"use client"

import React, { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MoveLeft } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

import { Button, buttonVariants } from "../ui/button"
import { projectType } from "./type"

function ProjectPage({
  page,
  nextPage,
  index,
  setPage,
  setShowPage,
}: {
  page: projectType
  nextPage: projectType
  index: number
  setPage: any
  setShowPage: any
}) {
  const [api, setApi] = React.useState<CarouselApi>()
  React.useEffect(() => {
    if (!api) {
      console.log("api testt tt ttt")
    } else api.scrollTo(1)
  }, [api])
  return (
    <div className="relative z-40 flex h-screen w-screen items-start justify-center overflow-hidden bg-white">
      <div className="absolute flex w-full justify-center p-9">
        <Button
          className={buttonVariants({
            variant: "link",
            size: "icon",
            className: "h-8 p-0 z-20 absolute top-9 left-9",
          })}
          onClick={() => setShowPage(false)}
        >
          <MoveLeft />
        </Button>
        <Image
          src="/logo_black.png"
          alt="logo"
          height={36}
          width={146}
          className="z-20"
        />
      </div>
      <Carousel
        opts={{
          align: "center",
        }}
      >
        <CarouselContent>
          <CarouselItem key={page?.title} className="max-w-[900px]">
            <div className="flex h-full flex-col items-center justify-center  ">
              <span className=" text-2xl text-accent-foreground">
                {page?.location}
              </span>
              <h2 className="text-center font-lamore text-4xl  font-normal uppercase  md:text-[54px] ">
                {page?.title}
              </h2>
            </div>
          </CarouselItem>
          {page?.slides.map((card: any, idx: number) => {
            return card.type === "file" ? (
              <CarouselItem key={idx} className="h-svh ">
                <div className="flex h-svh relative">
                  <Image
                    src={card[card.type].url}
                    alt={card.title}
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
              </CarouselItem>
            ) : (
              <CarouselItem key={page?.title} className="max-w-[900px]">
                <div className="flex h-full flex-col items-center justify-center ">
                  <p className="text-center font-sans text-2xl leading-none max-w-[600px]">
                    {card[card.type].content}
                  </p>
                </div>
              </CarouselItem>
            )
          })}
          <CarouselItem key={nextPage?.title} className="max-w-[900px]">
            <div className="flex h-full flex-col items-center justify-center  ">
              <span className=" text-2xl text-accent-foreground">
                {nextPage?.location}
              </span>
              <h2
                className="text-center font-lamore text-4xl  font-normal uppercase  md:text-[54px]  "
                onClick={() => setPage(index + 1)}
              >
                {nextPage?.title}
              </h2>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default ProjectPage
