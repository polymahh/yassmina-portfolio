import { Document } from '@contentful/rich-text-types';
export interface projectType {
  title: string;
  projectId: string;
  description: Document;
  role: string;
  date: string;
  location: string;
  preview: string;
  status: string;
  slides: any[];
}

export interface resumeType {
  title: string;
  description: string;
  cv: string;
  image: string;
}
