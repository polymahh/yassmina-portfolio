import { motion } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

import { siteConfig } from '@/config/site';

const menuAnimation = {
  closed: {
    clipPath: 'circle(1px at calc(100% - 0px) 0px)',

    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
  open: (height = 10000) => ({
    clipPath: `circle(${height * 2}px at calc(100% - 10px) 10px)`,
    transition: {
      duration: 1.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  }),
};

const textMotion = {
  rest: {
    y: 0,
    transition: {
      duration: 0.2,
      type: 'tween',
      ease: 'easeOut',
    },
  },
  hover: {
    y: -65,
    transition: {
      duration: 0.2,
      type: 'tween',
      ease: 'easeOut',
    },
  },
};

function MobileMenu({ open, setOpen }: { open: boolean; setOpen: any }) {
  return (
    <motion.div
      className="fixed top-0 bottom-0 left-0 flex justify-center overflow-hidden -right-0 bg-popover"
      variants={menuAnimation}
      animate={open ? 'open' : 'closed'}
      initial="rest"
    >
      <div className="container flex flex-col-reverse items-center justify-center w-full h-full md:items-end md:p-12 md:flex-row md:justify-between">
        <div className="flex flex-col self-start gap-2 pb-6 md:self-end">
          <span className="text-xl">elalaouiyasmina@gmail.com</span>
          <div className="flex gap-4 pt-8">
            <Link
              href="https://www.linkedin.com/in/yasmina-el-alaoui-48927a163/"
              target="_blank"
              className="hover:text-accent-foreground"
            >
              <Linkedin />
            </Link>
            <Link href="https://www.instagram.com/yas.dwg" target="_blank" className="hover:text-accent-foreground">
              <Instagram />
            </Link>
          </div>
        </div>
        <div className="mb-[108px] flex flex-col gap-8 grow md:grow-0 justify-center text-6xl">
          {siteConfig.mainNav.map(
            (item, index) =>
              item.href && (
                <Link key={index} href={item.href} className="capitalize" onClick={() => setOpen(false)}>
                  {/* {item.title} */}
                  <motion.div
                    className="flex flex-col overflow-hidden h-[65px]"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    <motion.span variants={textMotion} transition={{ staggerChildren: 0.5 }}>
                      {item.title}
                    </motion.span>
                    <motion.span
                      className="text-accent-foreground"
                      variants={textMotion}
                      transition={{ staggerChildren: 0.5 }}
                    >
                      {item.title}
                    </motion.span>
                  </motion.div>
                </Link>
              ),
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default MobileMenu;
