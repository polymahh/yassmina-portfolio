import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import { projectType } from "./type"

function ProjectCard({
  card,
  idx,
  handleClick,
}: {
  card: projectType
  idx: number
  handleClick: any
}) {
  const imageAnimation = {
    rest: {
      opacity: 0,
      transition: {
        duration: 0.4,
        type: "tween",
        ease: "easeOut",
      },
    },
    hover: {
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.4,
        type: "tween",
        ease: "easeIn",
      },
    },
  }

  const titleAnimation = {
    rest: {
      height: 80,
      transition: {
        duration: 0.3,
        type: "tween",
        ease: "easeOut",
      },
    },
    hover: {
      height: 120,
      transition: {
        duration: 0.3,
        type: "tween",
        ease: "easeIn",
      },
    },
  }

  return (
    <motion.div
      className={`flex w-full flex-col  items-center  justify-between hover:cursor-pointer md:flex-row `}
      onClick={() => handleClick(idx)}
      variants={titleAnimation}
      initial="rest"
      whileHover="hover"
    >
      <h1 className="text-center font-lamore text-4xl font-normal uppercase leading-none md:text-left lg:text-[54px]">
        {card.title}
      </h1>
      <motion.div
        variants={imageAnimation}
        className="hidden opacity-0 md:flex  "
      >
        <Image src={card.preview} alt="preview" height="120" width="300" />
      </motion.div>
      <span className=" text-right text-lg text-accent-foreground lg:text-2xl">
        {card.location}
      </span>
    </motion.div>
  )
}

export default ProjectCard
