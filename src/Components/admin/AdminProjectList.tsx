import { FC, useState, useEffect, useContext, useCallback } from "react";
import { ProjectSkeleton } from "../project/ProjectSkeleton";
import { AnimatePresence, motion } from "framer-motion";
import ProjectType from "@/types/ProjectType";
import { AdminProject } from "./AdminProject";
import { Modal } from "../layout/Modal";
import { LayoutContext } from "@/context/LayoutContext";
import { useTopLoader } from "nextjs-toploader";

interface AdminProjectListProps {
  modalState: boolean;
  setModalState: (state: boolean) => void;
  onEdit: (id?: string) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (id: string) => void;
}

export const AdminProjectList: FC<AdminProjectListProps> = ({ 
  modalState, 
  setModalState, 
  onEdit, 
  onDelete, 
  onToggleVisibility 
}) => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(false);
  const layoutData = useContext(LayoutContext);
  const loader = useTopLoader();

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        layoutData?.showToast({ message: 'Chyba při načítání projektů', type: 'error' });
      }
    } catch (error) {
      layoutData?.showToast({ message: 'Chyba při načítání projektů', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [layoutData]);

  // Načtení projektů při otevření modalu
  useEffect(() => {
    if (modalState) {
      loadProjects();
    }
  }, [modalState, loadProjects]);

  const handleToggleVisibility = async (projectId: string) => {
    loader.start();
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PATCH',
      });
      if (response.ok) {
        const data = await response.json();
        const updatedProject = data.project;
        setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
        layoutData?.showToast({ message: `Projekt ${updatedProject.visible ? 'zveřejněn' : 'skryt'}`, type: 'success' });
        onToggleVisibility(projectId); // Volání parent funkce pro update
      } else {
        layoutData?.showToast({ message: 'Chyba při změně viditelnosti projektu', type: 'error' });
      }
    } catch (error) {
      layoutData?.showToast({ message: 'Chyba při změně viditelnosti projektu', type: 'error' });
    } finally {
      loader.done();
    }
  };

  const handleDelete = (projectId: string) => {
    // Pouze aktualizovat lokální state, skutečné mazání řeší parent
    setProjects(prev => prev.filter(p => p.id !== projectId));
    onDelete(projectId);
  };

  return (
    <Modal setModalState={setModalState} modalState={modalState} title="Správa projektů">
      <AnimatePresence mode="wait">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-reg lg:gap-8 mt-5 w-full h-auto relative">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
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
                  onDelete={() => handleDelete(project.id)}
                  edit={() => onEdit(project.id)}
                  onToggleVisibility={() => handleToggleVisibility(project.id)}
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