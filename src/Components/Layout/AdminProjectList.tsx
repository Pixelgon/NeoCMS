import { FC } from "react";
import { AdminProject } from "@/components/layout/AdminProject";
import { ProjectSkeleton } from "./ProjectSkeleton";
import { AnimatePresence, motion } from "framer-motion";
import ProjectType from "@/types/ProjectType";

interface AdminProjectListProps {
  projects: ProjectType[];
  openProjectModal: (id?: string) => void;
  onDeleteProject: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  loading: boolean;
}

export const AdminProjectList: FC<AdminProjectListProps> = ({ projects, openProjectModal, loading, onDeleteProject, onToggleVisibility }) => {
  return (
    <AnimatePresence mode="wait">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-reg lg:gap-8 mt-5 w-full h-auto relative">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectSkeleton />
              </motion.div>
            ))
          ) : projects.length > 0 ? (
            projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AdminProject
                  name={project.name}
                  image={project.photo}
                  slug={project.slug}
                  visible={project.visible}
                  onDelete={() => onDeleteProject(project.id)}
                  edit={() => openProjectModal(project.id)}
                  onToggleVisibility={() => onToggleVisibility(project.id)}
                />
              </motion.div>
            ))
          ) : (
            <motion.p
              key="no-projects"
              className="col-span-full text-center text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Neexistuje žádný projekt.
            </motion.p>
          )}
      </div>
    </AnimatePresence>
  );
};