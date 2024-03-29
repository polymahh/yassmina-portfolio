import { cubicBezier, motion } from 'framer-motion';
import Image from 'next/image';

let isMobile: boolean = true;
if (typeof window !== 'undefined') {
  isMobile = window.innerWidth < 768;
}

const container = {
  show: {
    x: 1,
    trasition: {
      stagerchildren: 0.35,
    },
  },
  exit: {
    opacity: 0,
    Y: 200,
    transition: {
      ease: 'easeInOut',
      duration: 0.8,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 200,
  },
  show: (idx: number) => ({
    opacity: 0.6,
    y: 0,
    transition: {
      ease: cubicBezier(0.6, 0.01, -0.05, 0.95),
      duration: isMobile ? 0 : 1.2,
      delay: isMobile ? 0 : 0.3 * idx,
    },
  }),
  exit: {
    opacity: 0,
    Y: 200,
    transition: {
      ease: 'easeInOut',
      duration: 0.6,
    },
  },
};

const centerImage = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: cubicBezier(0.6, 0.01, -0.05, 0.95),
      duration: isMobile ? 0 : 1.6,
    },
  },
};

function Loading({ setLoading, centerImageSrc }: { setLoading: (loading: boolean) => void; centerImageSrc: string }) {
  return (
    <motion.div
      className="items-center w-full h-screen p-8 overflow-hidden bg-white "
      initial="hidden"
      animate="show"
      exit="exit"
      variants={container}
      onAnimationComplete={() => setLoading(false)}
      viewport={{ once: true }}
    >
      <div className="relative m-auto flex h-full w-full  justify-center md:max-h-[900px] md:max-w-[1200px]">
        <motion.div
          className="z-40 self-center hidden md:block "
          layoutId="center-image"
          variants={centerImage}
          custom={0}
        >
          <Image priority={true} src={centerImageSrc} alt="img" width={800} height={400} />
        </motion.div>
        <motion.div className="absolute top-0 left-0 hidden md:block" variants={item} custom={1}>
          <Image priority={true} src="/images/top_left.webp" alt="img" width={300} height={200} />
        </motion.div>

        <motion.div className="absolute top-0 right-0 hidden md:block" variants={item} custom={2}>
          <Image priority={true} src="/images/top_right.webp" alt="img" width={300} height={200} />
        </motion.div>

        <motion.div className="absolute bottom-0 left-0 hidden md:block" variants={item} custom={3}>
          <Image priority={true} src="/images/bottom_left.webp" alt="img" width={300} height={200} />
        </motion.div>
        <motion.div className="absolute bottom-0 right-0 hidden md:block" variants={item} custom={4}>
          <Image priority={true} src="/images/bottom_right.webp" alt="img" width={300} height={200} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Loading;
