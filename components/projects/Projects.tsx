'use client';

import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { getProjects } from '@/lib/requests';
import { cn } from '@/lib/utils';

import Loading from '../Loading';
import { Button, buttonVariants } from '../ui/button';
import ProjectIndex from './ProjectIndex';
import ProjectsCarousel from './ProjectsCarousel';

function Projects() {
  const [index, setIndex] = useState(false);
  const [loading, setLoading] = useState(false);

  // TODO: remove animations later (manually disabled for now)

  const loaded = true; //  params.get("loaded")

  // useEffect(() => {
  //   if (loaded === "true") {
  //     setLoading(false)
  //   }
  // }, [])

  const { data } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  });

  return (
    <AnimatePresence>
      <div className="flex flex-col h-full md:gap-6">
        {index ? (
          <ProjectIndex data={data?.structuredData ?? []} />
        ) : (
          <ProjectsCarousel data={data?.structuredData ?? []} />
        )}

        <div className="flex gap-4 pl-4 mt-4">
          <Button
            className={buttonVariants({
              size: 'link',
              variant: 'link',
              className: `uppercase ${index ? 'underline' : 'text-muted-foreground'}`,
            })}
            onClick={() => setIndex(true)}
          >
            index
          </Button>
          <Button
            className={buttonVariants({
              size: 'link',
              variant: 'link',
              className: `uppercase ${!index ? 'underline' : 'text-muted-foreground'}`,
            })}
            onClick={() => setIndex(false)}
          >
            gallery
          </Button>
        </div>
      </div>
      {loading ? (
        <motion.div
          className={cn(
            ' fixed left-0 top-0 z-20 h-screen w-screen overflow-hidden  ',
            loaded ? 'md:hidden' : ' md:block',
          )}
          key={'loader'}
        >
          <Loading setLoading={setLoading} centerImageSrc={data?.structuredData?.[0].preview ?? ''} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default Projects;
