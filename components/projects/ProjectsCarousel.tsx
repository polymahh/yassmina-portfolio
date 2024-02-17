import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSwiper } from 'swiper/react';

import { projectType } from './type';

function ProjectsCarousel({ data }: { data: projectType[] }) {
  const router = useRouter();
  let isMobile: boolean = false;

  if (typeof window !== 'undefined') {
    isMobile = window.innerWidth < 768;
  }
  const handleClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  // TODO: fix flickering on first load (due to the custom css width)
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
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
        className="w-full grow md:max-h-[900px] md:w-[90%]"
      >
        {data?.map((card, idx) => {
          return (
            <SwiperSlide key={card.title} id={card.title} style={{ width: '80%' }}>
              <div className="flex flex-col items-center h-full md:grid ">
                <motion.div
                  layoutId={idx === 0 && !isMobile ? 'center-image' : ''}
                  className="flex justify-center h-full overflow-hidden cursor-pointer md:h-auto md:w-full"
                  onClick={() => handleClick(card.projectId)}
                >
                  <Image
                    src={card.preview}
                    alt="project preview"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                      width: 'auto',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    priority={true}
                  />
                </motion.div>
                <div className="flex flex-col items-center bg-white border border-white">
                  <h2
                    onClick={() => handleClick(card.projectId)}
                    className="mt-4 cursor-pointer text-center font-lamore text-4xl font-normal uppercase leading-tight tracking-tighter md:mt-8 md:text-[54px]"
                  >
                    {card.title}
                  </h2>
                  <span className="text-2xl text-accent-foreground">{card.location}</span>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        <Controls />
      </Swiper>
    </>
  );
}

export default ProjectsCarousel;

const Controls = () => {
  const swipe = useSwiper();
  return (
    <>
      {/* prev */}
      <div
        className="absolute left-0 top-0 z-10 h-full w-[10%] cursor-pointer bg-white/20 hover:bg-white/40"
        onClick={() => swipe.slidePrev()}
      ></div>
      {/* next */}
      <div
        className="absolute right-0 top-0 z-10 h-full w-[10%] cursor-pointer bg-white/20 hover:bg-white/40"
        onClick={() => swipe.slideNext()}
      ></div>
    </>
  );
};
