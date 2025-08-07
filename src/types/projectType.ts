import { Tag } from "@prisma/client";

export type ProjectType = {
      id: string;
      name: string;
      body: string;
      description: string;
      background: string;
      photo: string;
      slug: string;
      visible: boolean;
      tags: Tag[];
}
export default ProjectType;