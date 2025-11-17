import { FC, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AdminProject } from "./adminProject";
import ProjectCardType from "@/types/projectCardType";
import { useTopLoader } from "nextjs-toploader";
import { LayoutContext } from "@/context/layoutContext";

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
  onToggleVisibility,
}) => {
  
  const loader = useTopLoader();
  const layoutData = useContext(LayoutContext);
  const [projects, setProjects] = useState<ProjectCardType[]>([]);


  const loadProjects = useCallback(async () => {
    try {
      loader.start();
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        layoutData.showToast({
          message: "Chyba při načítání projektů",
          type: "error",
        });
      }
    } catch (error) {
      layoutData.showToast({
        message: "Chyba při načítání projektů",
        type: "error",
      });
    } finally {
      loader.done();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
  );
};

export default AdminProjectList;