import React from "react"
import { EffectCoverflow, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useSwiper } from "swiper/react"

import { projectType } from "./type"

function ProjectsCarousel({ data }: { data: projectType[] }) {
  const router = useRouter()
  let isMobile: boolean = false
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 768
  }
  const handleClick = (projectId: string) => {
    console.log(projectId)
    router.push(`/projects/${projectId}`)
  }

  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        breakpoints={{
          320: {
            spaceBetween: 20,
          },
          700: {
            spaceBetween: 60,
          },
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 1,
          depth: 120,
          modifier: 1,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper w-full md:w-[90%] grow md:max-h-[900px]  "
      >
        {data?.map((card: projectType, idx: number) => {
          return (
            <SwiperSlide
              key={card.title}
              id={card.title}
              style={{ width: "80%" }}
            >
              <div className="flex md:grid  flex-col items-center h-full ">
                <motion.div
                  layoutId={idx === 0 && !isMobile ? "center-image" : ""}
                  className="flex justify-center overflow-hidden cursor-pointer h-full md:h-auto md:w-full"
                  onClick={() => handleClick(card.projectId)}
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
                </motion.div>
                <div className="flex flex-col items-center border border-white  bg-white">
                  <h2
                    onClick={() => handleClick(card.projectId)}
                    className="mt-4 md:mt-8 cursor-pointer text-center font-lamore text-4xl font-normal uppercase leading-tight tracking-tighter md:text-[54px]"
                  >
                    {card.title}
                  </h2>
                  <span className=" text-2xl text-accent-foreground">
                    {card.location}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
        <Controls />
      </Swiper>
    </>
  )
}

export default ProjectsCarousel

const Controls = () => {
  const swipe = useSwiper()
  return (
    <>
      {/* prev */}
      <div
        className="absolute top-0 left-0 z-10 bg-white/20 hover:bg-white/40 cursor-pointer h-full w-[10%]"
        onClick={() => swipe.slidePrev()}
      ></div>
      {/* next */}
      <div
        className="absolute top-0 right-0 z-10 bg-white/20 hover:bg-white/40 cursor-pointer h-full w-[10%]"
        onClick={() => swipe.slideNext()}
      ></div>
    </>
  )
}
