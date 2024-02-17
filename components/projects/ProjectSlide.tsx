'use client';

import { MoveLeft, X } from 'lucide-react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Mousewheel } from 'swiper/modules';
import { Button, buttonVariants } from '../ui/button';
import { projectType } from './type';

import { getProjects } from '@/lib/requests';

function ProjectSlide() {
  const router = useRouter();
  const pathname = usePathname();
  const projectName = pathname.split('/')[2];

  const { data: fullData } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  });

  const data = fullData?.structuredData;

  const pageidx = data?.findIndex((page: projectType) => page.projectId === projectName) ?? 0;
  const page = data?.[pageidx];
  const nextPage = pageidx + 1 < (data?.length ?? 0) ? data?.[pageidx + 1] : null;

  const description = page?.description ? documentToHtmlString(page.description) : '';
  return (
    <div className="fixed top-0 left-0 z-40 items-start justify-center w-screen h-screen overflow-hidden bg-white">
      <div className="absolute flex justify-between w-full p-3 md:p-6">
        <Button
          className={buttonVariants({
            variant: 'link',
            size: 'icon',
            className: ' p-0 z-20 hover:bg-white',
          })}
          onClick={() => router.push('/projects?loaded=true')}
        >
          <MoveLeft />
        </Button>
        <Image src="/logo_black.png" alt="logo" height={36} width={146} className="z-20 hidden md:block" />
        <Button
          className={buttonVariants({
            variant: 'link',
            size: 'icon',
            className: ' p-0 z-20 hidden md:flex hover:bg-white',
          })}
          onClick={() => router.push('/projects?loaded=true')}
        >
          <X />
        </Button>
      </div>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        slidesPerView={'auto'}
        spaceBetween={0}
        mousewheel={{ releaseOnEdges: true, sensitivity: 0.1 }}
        modules={[Mousewheel]}
        className="w-screen mySwiper grow "
      >
        <SwiperSlide key={page?.title} className="relative max-w-[900px] ">
          <div className="absolute left-0 top-0 flex h-screen w-full max-w-[900px]  flex-col items-center justify-center  ">
            <span className="text-2xl text-accent-foreground">{page?.location}</span>
            <h2 className="text-center font-lamore text-4xl  font-normal uppercase  md:text-[54px] ">{page?.title}</h2>
          </div>
        </SwiperSlide>

        {page?.slides.map((url) => {
          return (
            <SwiperSlide key={url} className="h-svh ">
              <div className="relative flex h-svh">
                <Image
                  src={url}
                  alt={`${page.title} image`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                  priority={true}
                />
              </div>
            </SwiperSlide>
          );
        })}
        <SwiperSlide className="max-w-[900px]" style={{ height: 'auto' }}>
          <div className=" flex h-full w-full max-w-[600px] justify-end  flex-col gap-8 p-4 pl-8 md:pl-24">
            <div className="flex flex-col gap-4 text-lg text-secondary-foreground">
              <h2 className="pt-12 pb-4 text-[48px] font-normal text-left uppercase cursor-pointer font-lamore md:pt-4 xl:pt-16">
                {page?.title}
              </h2>
              <div
                className="flex flex-col gap-4 text-lg text-justify text-secondary-foreground"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
            <div className="flex flex-col ">
              <div className="flex justify-between py-2 text-xs border-t border-black sm:text-sm">
                <span className="uppercase">Location</span>
                <span>{page?.location}</span>
              </div>
              <div className="flex justify-between py-2 text-xs border-t border-black sm:text-sm">
                <span className="uppercase">YEAR</span>
                <span>{page?.date}</span>
              </div>
              <div className="flex justify-between py-2 text-xs border-t border-black sm:text-sm">
                <span className="uppercase">Role</span>
                <span>{page?.role}</span>
              </div>
              <div className="flex justify-between py-2 text-xs border-t border-black sm:text-sm">
                <span className="uppercase">Status</span>
                <span>{page?.status}</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        {pageidx + 1 < (data?.length ?? 0) ? (
          <SwiperSlide key={nextPage?.title} className="max-w-[900px]" style={{ height: 'auto' }}>
            <div className=" flex h-full w-full max-w-[900px]  flex-col  items-center justify-center gap-4 ">
              <span className="mb-8 text-2xl text-secondary-foreground">Next Project:</span>
              <h2
                className="cursor-pointer text-center font-lamore text-4xl font-normal uppercase  md:text-[54px]  "
                onClick={() => {
                  router.push(`/projects/${nextPage?.projectId}`);
                }}
              >
                {nextPage?.title}
              </h2>
              <span className="text-2xl text-accent-foreground">{nextPage?.location}</span>
            </div>
          </SwiperSlide>
        ) : null}
      </Swiper>
    </div>
  );
}

export default ProjectSlide;
