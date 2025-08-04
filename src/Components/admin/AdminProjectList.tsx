import { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectType from "@/types/ProjectType";
import { AdminProject } from "./AdminProject";
import { Modal } from "../layout/Modal";

interface AdminProjectListProps {
  modalState: boolean;
  setModalState: (state: boolean) => void;
  onEdit: (id?: string) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  projects: ProjectType[];
  loading?: boolean;
}

export const AdminProjectList: FC<AdminProjectListProps> = ({ 
  modalState, 
  setModalState, 
  onEdit, 
  onDelete, 
  onToggleVisibility,
  projects,
}) => {

  return (
    <Modal setModalState={setModalState} modalState={modalState} title="Správa projektů">
      <AnimatePresence mode="wait">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-reg lg:gap-8 mt-5 w-full h-auto relative">
          {projects.length > 0 ? (
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
                  onDelete={() => onDelete(project.id)}
                  edit={() => onEdit(project.id)}
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
    </Modal>
  );
};

export default AdminProjectList;