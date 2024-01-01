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
      className={`flex flex-col md:flex-row w-full  items-center  w-full justify-between hover:cursor-pointer `}
      onClick={() => handleClick(idx)}
      variants={titleAnimation}
      initial="rest"
      whileHover="hover"
    >
      <h1 className="font-lamore text-4xl text-center md:text-left font-normal uppercase leading-none lg:text-[54px]">
        {card.title}
      </h1>
      <motion.div
        variants={imageAnimation}
        className="opacity-0 hidden md:flex  "
      >
        <Image src={card.preview} alt="preview" height="120" width="300" />
      </motion.div>
      <span className=" text-lg lg:text-2xl text-right text-accent-foreground">
        {card.location}
      </span>
    </motion.div>
  )
}

export default ProjectCard
