import ProjectType from "./projectType";

export type AdminProjectContextType = {
   project: ProjectType;
   setProject: (project: ProjectType) => void;
   updateProject: (patch: Partial<ProjectType>) => void;
   resetProject: () => void;
};