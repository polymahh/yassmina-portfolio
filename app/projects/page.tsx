import Projects from '@/components/projects/Projects';

async function page() {
  return (
    <section className="relative flex flex-col justify-between h-full gap-6 md:container md:py-10 md:pb-8 md:pt-6">
      <Projects />
    </section>
  );
}

export default page;
