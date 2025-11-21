import { FC, useCallback, useContext, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AdminProject } from "./adminProject";
import ProjectCardType from "@/types/projectCardType";
import { useTopLoader } from "nextjs-toploader";
import { useLayout } from "@/context/layoutContext";
import { AdminProjectForm } from "./adminProjectForm";


export const AdminProjectList: FC = () => {
  const loader = useTopLoader();
  const layoutData = useLayout();
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

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const onDelete = async (projectId: string) => {
    try {
      loader.start();
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== projectId)
        );
        layoutData.showToast({
          message: "Projekt byl smazán",
          type: "success",
        });
      } else {
        layoutData.showToast({
          message: "Chyba při mazání projektu",
          type: "error",
        });
      }
    } catch (error) {
      layoutData.showToast({
        message: "Chyba při mazání projektu",
        type: "error",
      });
    } finally {
      loader.done();
    }
  };

  const onToggleVisibility = async (projectId: string) => {
    loader.start();
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PATCH',
      });
      if (response.ok) {
        const data = await response.json();
        const updatedProject = data.project; // API vrací { project: updatedProject }
        setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
        layoutData.showToast({ message: `Projekt ${updatedProject.visible ? 'zveřejněn' : 'skryt'}`, type: 'success' });
      } else {
        layoutData.showToast({ message: 'Chyba při změně viditelnosti projektu', type: 'error' });
      }
    } catch (error) {
      layoutData.showToast({ message: 'Chyba při změně viditelnosti projektu', type: 'error' });
    } finally {
      loader.done();
    }
  };

  const onEdit = (projectId: string) => {
    layoutData.closeDialog();
    layoutData.showModal({
      children: <AdminProjectForm />,
      title: "Upravit projekt",
    });
  };

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
