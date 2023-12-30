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
    <div className="relative w-screen h-screen flex justify-center items-start bg-white z-40">
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
      <Carousel>
        <CarouselContent>
          {page.slides.map((card: any, idx: number) => {
            return (
              <CarouselItem key={idx} className="w-2/3">
                {card.type === "file" ? (
                  <div className="flex w-screen">
                    <Image
                      src={card[card.type].url}
                      width={1120}
                      height={509}
                      alt={card.title}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center ">
                    <h2 className="font-lamore text-4xl font-normal uppercase leading-tight tracking-tighter md:text-[54px] mt-8">
                      {card[card.type].content}
                    </h2>
                  </div>
                )}
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default ProjectPage
