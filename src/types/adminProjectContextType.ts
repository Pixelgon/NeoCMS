import ProjectType from "./projectType";

export type AdminProjectContextType = {
   project: ProjectType;
   savedProject: ProjectType | null;
   setProject: (project: ProjectType) => void;
   updateProject: (patch: Partial<ProjectType>) => void;
   resetProject: () => void;
   isProjectComplete: () => boolean;
   isProjectModified: () => boolean;
   saveProject: (projectOverride?: ProjectType) => Promise<
      | { ok: true; data: unknown }
      | { ok: false; error: string }
   >;
   isProjectUnsaved: () => boolean;
};