import { QueryClient } from '@tanstack/react-query';
import { Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { getProjects } from '@/lib/requests';

// export const dynamic = "force-static"
const queryClient = new QueryClient();

async function Resume() {
  const data = await queryClient.ensureQueryData({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  });
  const resume = data?.resume;
  return (
    <section className="pt:8 container flex max-w-[1116px] h-full flex-wrap-reverse justify-between  gap-6 pb-8 md:flex-nowrap md:pt-20 overflow-auto">
      <div className="flex flex-col items-start justify-center ">
        <h1 className="text-[48px] uppercase font-lamore">
          Hi, I&apos;m YASMINA
          <br /> EL ALAOUI ISMAILI
        </h1>
        <p className=" max-w-[544px] pb-12 pt-6 text-lg leading-7	">{resume?.description}</p>
        <Link
          className={buttonVariants({
            variant: 'square',
          })}
          href={resume?.cv ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          download={true}
        >
          <Download /> <span className="pl-2 font-light font-lg">Download my resume</span>
        </Link>
      </div>
      <div className="flex justify-end ">
        <Image
          src={resume?.image ?? ''}
          alt="picture"
          objectFit="contain"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: 'auto',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    </section>
  );
}

export default Resume;
