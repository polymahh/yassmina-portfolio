import { motion } from 'framer-motion';

import { projectType } from './type';

function ProjectCard({ card, idx, handleClick }: { card: projectType; idx: number; handleClick: any }) {
  const imageAnimation = {
    rest: {
      opacity: 0,
      transition: {
        duration: 0.4,
        type: 'tween',
        ease: 'easeOut',
      },
    },
    hover: {
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.4,
        type: 'tween',
        ease: 'easeIn',
      },
    },
  };

  const titleAnimation = {
    rest: {
      height: 80,
      transition: {
        duration: 0.3,
        type: 'tween',
        ease: 'easeOut',
      },
    },
    hover: {
      height: 120,
      transition: {
        duration: 0.3,
        type: 'tween',
        ease: 'easeIn',
      },
    },
  };

  return (
    <>
      <motion.div
        className={`hidden w-full flex-col  items-center  justify-between hover:cursor-pointer md:flex md:flex-row `}
        onClick={() => handleClick(card.projectId)}
        variants={titleAnimation}
        initial="rest"
        whileHover="hover"
      >
        <h1 className="text-center font-lamore text-4xl font-normal uppercase leading-none md:text-left lg:text-[54px]">
          {card.title}
        </h1>
        <span className="text-lg text-right text-accent-foreground lg:text-2xl">{card.location}</span>
      </motion.div>
      <div
        className="flex flex-col items-center gap-6 cursor-pointer md:hidden"
        onClick={() => handleClick(card.projectId)}
      >
        <h1 className="text-4xl font-normal leading-none text-center uppercase font-lamore">{card.title}</h1>
        <span className="text-lg text-right text-accent-foreground">{card.location}</span>
      </div>
    </>
  );
}

export default ProjectCard;
