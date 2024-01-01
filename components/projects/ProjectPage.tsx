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
    <div className="relative w-screen h-screen flex justify-center items-start bg-white z-40 overflow-hidden">
      <div className="absolute w-full flex p-9 justify-center">
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
            <div className="flex flex-col items-center justify-center h-full  ">
              <span className=" text-2xl text-accent-foreground">
                {page.location}
              </span>
              <h2 className="font-lamore text-9xl font-normal  text-center uppercase  md:text-[54px] ">
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
                <div className="flex flex-col items-center justify-center h-full ">
                  <h2 className="font-lamore text-2xl font-normal text-center leading-tight uppercase md:text-[54px]">
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
