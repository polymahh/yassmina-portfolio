import { useRouter } from 'next/navigation';

import ProjectCard from './ProjectCard';
import { projectType } from './type';

function ProjectList({ data }: { data: projectType[] }) {
  const router = useRouter();

  const handleClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };
  return (
    <div className="flex flex-col gap-4 grow">
      {data?.map((card, idx) => {
        return <ProjectCard key={card.title} card={card} handleClick={handleClick} idx={idx} />;
      })}
    </div>
  );
}

export default ProjectList;
