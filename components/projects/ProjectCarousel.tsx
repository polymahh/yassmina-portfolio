import React from "react"
import Image from "next/image"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

import { Button } from "../ui/button"
import { projectType } from "./type"

function ProjectCarousel({ data }: { data: projectType[] }) {
  return (
    <div className="flex justify-center">
      <Carousel
        opts={{
          align: "center",
        }}
      >
        <CarouselContent className=" max-w-[1100px]">
          {data.map((card: projectType, idx: number) => {
            return (
              <CarouselItem key={card.title} className="max-w-[1000px]">
                <div className="flex flex-col items-center  ">
                  <div className="h-[450px] overflow-hidden">
                    <Image
                      src={card.preview}
                      alt="project preview"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{
                        width: "auto",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      priority={true}
                    />
                  </div>

                  <h2 className="font-lamore text-4xl font-normal text-center uppercase leading-tight tracking-tighter md:text-[54px] mt-8">
                    {card.title}
                  </h2>
                  <span className=" text-2xl text-accent-foreground">
                    {card.location}
                  </span>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="-left-0 top-0 h-[450px]" />
        <CarouselNext className="-right-0 top-0 h-[450px]" />
      </Carousel>
    </div>
  )
}

export default ProjectCarousel
