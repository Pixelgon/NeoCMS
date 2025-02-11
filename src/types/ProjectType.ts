import { TagType } from "./TagType.ts";

export type ProjectType = {
      id: string;
      name: string;
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