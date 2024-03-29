'use server';
import { projectType, resumeType } from '@/components/projects/type';

const spaceId = process.env.CONTENTFUL_SPACE_ID as string;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN as string;

export async function getProjects() {
  try {
    const res = await fetch(`https://cdn.contentful.com/spaces/${spaceId}/entries?access_token=${accessToken}`, {
      cache: 'no-cache',
    });

    const response = await res.json();

    const rawResume = response?.items?.find((item: any) => item?.sys?.contentType?.sys?.id == 'resume');

    const resumeImgID = rawResume?.fields?.image?.sys.id;
    const cvId = rawResume?.fields?.cv?.sys?.id;
    const resume = {
      title: rawResume?.fields?.name,
      cv: `https:${response?.includes?.Asset?.find((asset: any) => asset.sys.id === cvId).fields.file.url}`,
      description: rawResume?.fields?.description?.content[0]?.content?.[0]?.value,
      image: `https:${response?.includes?.Asset?.find((asset: any) => asset?.sys?.id === resumeImgID).fields.file.url}`,
    };
    const structuredData = await response?.items
      ?.filter((item: any) => item?.sys?.contentType?.sys?.id === 'projects')
      .sort((a: any, b: any) => a.sys.createdAt.localeCompare(b.sys.createdAt))
      .map((project: any) => {
        const previewId = project?.fields?.preview.sys.id;
        const previewurl = response?.includes?.Asset.find((asset: any) => asset.sys.id === previewId).fields.file.url;
        const slidesIDS = project?.fields?.carousel.map((img: any) => img.sys.id);
        return {
          projectId: project?.fields?.projectId,
          title: project?.fields?.title,
          location: project?.fields?.location,
          description: project?.fields?.description,
          role: project?.fields?.role,
          status: project?.fields?.status,
          date: project?.fields?.year,
          preview: `https:${previewurl}`,
          slides: response?.includes?.Asset?.filter((asset: any) => slidesIDS.includes(asset.sys.id)).map(
            (asset: any) => `https:${asset.fields.file.url}`,
          ),
        };
      });
    return { structuredData, resume } as { structuredData: projectType[]; resume: resumeType };
  } catch (error) {
    console.log(error);
  }
}
