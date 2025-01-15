import { TagType } from "./TagType";

export type ProjectType = {
      id: number;
      title: string;
      body: string;
      description: string;
      background: string;
      photo: string;
      slug: string;
      createdAt: string;
      updatedAt: string;
      tags: TagType[];
}

export default ProjectType;