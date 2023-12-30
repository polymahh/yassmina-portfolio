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
      paddingTop: 0,
      paddingBottom: 0,

      transition: {
        duration: 0.3,
        type: "tween",
        ease: "easeOut",
      },
    },
    hover: {
      paddingTop: 40,
      paddingBottom: 40,

      transition: {
        duration: 0.3,
        type: "tween",
        ease: "easeIn",
      },
    },
  }

  return (
    <motion.div
      className={`flex w-full  items-center bg-[url('/img/hero-pattern.svg')]  justify-between gap-2 hover:cursor-pointer`}
      onClick={() => handleClick(idx)}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <motion.h1
        className="font-lamore text-4xl font-normal uppercase leading-tight tracking-tighter max-w-[] md:text-[54px]"
        variants={titleAnimation}
      >
        {card.title}
      </motion.h1>
      <motion.div
        variants={imageAnimation}
        className="opacity-0 absolute left-1/2"
      >
        <Image src={card.preview} alt="preview" height="120" width="300" />
      </motion.div>
      <span className=" text-2xl text-accent-foreground">{card.location}</span>
    </motion.div>
  )
}

export default ProjectCard
