import { FC } from "react";
import { AdminProject } from "@/components/layout/AdminProject";
import ProjectType from "@/types/ProjectType";

interface AdminProjectListProps {
  projects: ProjectType[];
  openProjectModal: (id?: string) => void;
}

export const AdminProjectList: FC<AdminProjectListProps> = ({ projects, openProjectModal }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full items-center mt-5 justify-center">
      {projects.length > 0 ? (
        projects.map((project) => (
          <AdminProject key={project.id} name={project.name} image={project.photo} edit={() => openProjectModal(project.id)} />
        ))
      ) : (
        <p>Neexistuje žádný projekt.</p>
      )}
    </div>
  );
};