"use client"

import React from "react"
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
  setShowPage,
}: {
  page: projectType
  setShowPage: any
}) {
  console.log("🚀 ~ file: ProjectPage.tsx:25 ~ page:", page)
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
          <CarouselItem key={page.title} className="max-w-[900px]">
            <div className="flex h-full flex-col items-center justify-center  ">
              <span className=" text-2xl text-accent-foreground">
                {page.location}
              </span>
              <h2 className="text-center font-lamore text-9xl  font-normal uppercase  md:text-[54px] ">
                {page.title}
              </h2>
            </div>
          </CarouselItem>
          {page.slides.map((card: any, idx: number) => {
            return card.type === "file" ? (
              <CarouselItem key={idx} className="h-svh ">
                <div className="flex h-svh">
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
                  />
                </div>
              </CarouselItem>
            ) : (
              <CarouselItem key={page.title} className="max-w-[900px]">
                <div className="flex h-full flex-col items-center justify-center ">
                  <h2 className="text-center font-lamore text-2xl font-normal uppercase leading-tight md:text-[54px]">
                    {card[card.type].content}
                  </h2>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default ProjectPage
