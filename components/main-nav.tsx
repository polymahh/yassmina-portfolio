'use client';

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { NavItem } from '@/types/nav';

import MobileMenu from './MobileMenu';
import { Button, buttonVariants } from './ui/button';

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const [open, setOpen] = React.useState(false);
  const path = usePathname();

  let isMobile: boolean = true;
  if (typeof window !== 'undefined') {
    isMobile = window.innerWidth < 768;
  }
  const openMenu = () => {
    setOpen((prev) => !prev);
  };
  return (
    <motion.div
      className="flex justify-between w-full gap-6 md:gap-10"
      initial={{
        opacity: 0,
        y: 50,
      }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0, duration: 0.5, ease: 'linear' }}
    >
      <Link onClick={() => setOpen(false)} href="/" className="z-40 flex items-center space-x-2 md:h-2">
        <Image src="/logo_black.png" alt="logo" height={36} width={146} />
      </Link>

      {items?.length ? (
        <motion.nav className="flex items-center gap-16 ">
          {items?.map(
            (item, index) =>
              item.href && (
                <motion.div key={item.title} className="relative hidden md:flex">
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={path.includes(item.title.toLowerCase()) ? { opacity: 0 } : { opacity: 1 }}
                  >
                    <Link
                      key={index}
                      href={item.href}
                      className={buttonVariants({
                        variant: 'link',
                        size: 'link',
                        className: `uppercase text-muted-foreground`,
                      })}
                    >
                      {item.title}
                    </Link>
                  </motion.div>

                  {path.includes(item.title.toLowerCase()) && (
                    <motion.div
                      layoutId="nav-item"
                      className={buttonVariants({
                        variant: 'link',
                        size: 'link',
                        className: 'absolute  uppercase underline ',
                      })}
                    >
                      {item.title}
                    </motion.div>
                  )}
                </motion.div>
              ),
          )}
          <Button
            className={buttonVariants({
              variant: 'link',
              size: 'icon',
              className: 'h-8 p-0 z-50 ',
            })}
            onClick={openMenu}
          >
            {open ? <X className="w-8 " /> : <Menu className="w-8 " />}
          </Button>
        </motion.nav>
      ) : null}
      <MobileMenu open={open} setOpen={setOpen} />
    </motion.div>
  );
}
