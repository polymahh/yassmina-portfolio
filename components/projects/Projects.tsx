"use client"

import React, { useState } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

import Carousel from "../carousel/Carousel"
import { Button, buttonVariants } from "../ui/button"
import ProjectCarousel from "./ProjectCarousel"
import ProjectIndex from "./ProjectIndex"
import ProjectPage from "./ProjectPage"
import { projectType } from "./type"

function Projects({ data }: any) {
  const [index, setIndex] = useState(true)
  const [showpage, setShowPage] = useState(false)
  const [page, setPage] = useState(data.data[0])

  return (
    <div className="flex h-full flex-col justify-between">
      {index ? (
        <ProjectIndex
          data={data.data}
          setPage={setPage}
          setShowPage={setShowPage}
        />
      ) : (
        <>
          <ProjectCarousel data={data.data} />
          {/* <Carousel
            width={1100}
            height={500}
            items={data?.data.map((card: projectType, idx: number) => {
              return (
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
              )
            })}
          /> */}
        </>
      )}
      <div className="flex gap-4 ">
        <Button
          className={buttonVariants({
            size: "link",
            variant: "link",
            className: `uppercase ${
              index ? "underline" : "text-muted-foreground"
            }`,
          })}
          onClick={() => setIndex(true)}
        >
          index
        </Button>
        <Button
          className={buttonVariants({
            size: "link",
            variant: "link",
            className: `uppercase ${
              !index ? "underline" : "text-muted-foreground"
            }`,
          })}
          onClick={() => setIndex(false)}
        >
          galirie
        </Button>
      </div>
      <div
        className={cn("absolute top-0 left-0", !!showpage ? "flex" : "hidden")}
      >
        <ProjectPage page={page} setShowPage={setShowPage} />
      </div>
    </div>
  )
}

export default Projects
