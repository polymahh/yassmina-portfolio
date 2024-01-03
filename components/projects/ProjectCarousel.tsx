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

function ProjectCarousel({
  data,
  setPage,
  setShowPage,
}: {
  data: projectType[]
  setPage: any
  setShowPage: any
}) {
  const handleClick = (idx: number) => {
    console.log(idx)
    setPage(data[idx])
    setShowPage(true)
  }
  return (
    <div className="flex justify-center">
      <Carousel
        opts={{
          align: "center",
          skipSnaps: true,
          breakpoints: { lg: { skipSnaps: true } },
        }}
      >
        <CarouselContent className="  max-w-[1100px]">
          {data.map((card: projectType, idx: number) => {
            return (
              <CarouselItem key={card.title} className="max-w-[800px]">
                <div className="flex flex-col items-center   ">
                  <div
                    className="  overflow-hidden cursor-pointer"
                    onClick={() => handleClick(idx)}
                  >
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

                  <h2
                    onClick={() => handleClick(idx)}
                    className="mt-8 cursor-pointer text-center font-lamore text-4xl font-normal uppercase leading-tight tracking-tighter md:text-[54px]"
                  >
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
