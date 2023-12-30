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
  // const [api, setApi] = React.useState<CarouselApi>()

  // React.useEffect(() => {
  //   if (!api) {
  //     return
  //   }

  //   api.on("", (slide) => {
  //     // Do something on select.
  //     console.log(slide)
  //   })
  // }, [api])
  return (
    <div>
      <Carousel>
        <CarouselContent>
          {data.map((card: projectType, idx: number) => {
            return (
              <CarouselItem key={card.title} className="">
                <div className="flex flex-col items-center ">
                  <Image
                    src={card.preview}
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
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default ProjectCarousel
