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
  return (
    <div className="relative w-screen h-screen p-9 flex justify-center items-start bg-white z-40">
      <div className="absolute w-full flex justify-center">
        <Button
          className={buttonVariants({
            variant: "link",
            size: "icon",
            className: "h-8 p-0 z-20 absolute top-0 left-9",
          })}
          onClick={() => setShowPage(false)}
        >
          <MoveLeft />
        </Button>
        <Image src="/logo_black.png" alt="logo" height={36} width={146} />
      </div>
      <Carousel>
        <CarouselContent>
          {/* {page.map((card: projectType, idx: number) => {
            return (
              <CarouselItem key={card.title} className="">
                <div className="flex flex-col items-center ">
                  <Image
                    src={card.image}
                    width={1120}
                    height={509}
                    alt={card.title}
                  />
                  <h2 className="font-lamore text-4xl font-normal uppercase leading-tight tracking-tighter md:text-[54px] mt-8">
                    {card.title}
                  </h2>
                  <span className=" text-2xl text-accent-foreground">
                    {card.location}
                  </span>
                </div>
              </CarouselItem>
            )
          })} */}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default ProjectPage
