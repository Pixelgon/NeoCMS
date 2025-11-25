import { FC, useCallback, useContext, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AdminProject } from "./adminProject";
import ProjectCardType from "@/types/projectCardType";
import { useTopLoader } from "nextjs-toploader";
import { useLayout } from "@/context/layoutContext";
import { AdminProjectForm } from "./adminProjectForm";
import { useAdminProject } from "@/context/adminProjectContext";

export const AdminProjectList: FC = () => {
  const loader = useTopLoader();
  const layoutData = useLayout();
  const [projects, setProjects] = useState<ProjectCardType[]>([]);
  const { project, setProject, resetProject } = useAdminProject();
  const [projectsLoading, setProjectsLoading] = useState(false);

  const loadProjects = useCallback(async () => {
    try {
      setProjectsLoading(true);
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
      setProjectsLoading(false);
      loader.done();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const onDelete = async (projectID: string, projectName: string) => {
    layoutData.showDialog({
      message: `Opravdu chcete smazat ${projectName}?`,
      btnR: {
        text: "Ano",
        onClick: async () => {
          layoutData.closeDialog();
          await deleteProject(projectID, projectName);
        },
      },
      btnL: {
        text: "Ne",
        onClick: () => layoutData.closeDialog(),
      },
    });
  };

  const deleteProject = async (projectID: string, projectName: string) => {
    if (!projectID) {
      layoutData.showToast({
        message: "Chyba: nebylo zadáno ID projektu",
        type: "error",
      });
      loader.done();
      return;
    }
    if (project.id && project.id === projectID) {
      resetProject();
    }
    try {
      loader.start();
      const response = await fetch(`/api/projects/${projectID}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== projectID)
        );
        layoutData.showToast({
          message: `Projekt ${projectName} byl smazán`,
          type: "success",
        });
      } else {
        layoutData.showToast({
          message: `Chyba při mazání projektu ${projectName}`,
          type: "error",
        });
      }
    } catch (error) {
      layoutData.showToast({
        message: `Chyba při mazání projektu ${projectName}`,
        type: "error",
      });
    } finally {
      loader.done();
    }
  };

  const onToggleVisibility = async (projectID: string, projectName: string) => {
    loader.start();
    try {
      const response = await fetch(`/api/projects/${projectID}`, {
        method: "PATCH",
      });
      if (response.ok) {
        const data = await response.json();
        const updatedProject = data.project; // API vrací { project: updatedProject }
        setProjects((prev) =>
          prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
        );
        layoutData.showToast({
          message: `Projekt ${projectName} byl ${
            updatedProject.visible ? "zveřejněn" : "skryt"
          }`,
          type: "success",
        });
      } else {
        layoutData.showToast({
          message: `Chyba při změně viditelnosti projektu ${projectName}`,
          type: "error",
        });
      }
    } catch (error) {
      layoutData.showToast({
        message: `Chyba při změně viditelnosti projektu ${projectName}`,
        type: "error",
      });
    } finally {
      loader.done();
    }
  };

  const getAndOpenEditForm = async (projectID: string, projectName: string) => {
    loader.start();
    await fetch(`/api/projects/${projectID}`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
      })
      .catch((error) => {
        layoutData.showToast({ message: error, type: "error" });
      });
    loader.done();
    layoutData.showModal({
      children: <AdminProjectForm />,
      title: `Upravit projekt ${projectName}`,
    });
  };

  const onEdit = async (projectID: string, projectName: string) => {
    if (projectID === project.id) {
      layoutData.showModal({
        children: <AdminProjectForm />,
        title: `Upravit projekt ${projectName}`,
      });
      return;
    } else if (project.name || project.id) {
      layoutData.showDialog({
        message: `Probíhá práce na projektu ${project.name}, opravdu chcete pokračovat? Neuložené změny budou ztraceny.`,
        btnR: {
          text: "Ano",
          onClick: async () => {
            layoutData.closeDialog();
            await getAndOpenEditForm(projectID, projectName);
          },
        },
        btnL: {
          text: "Ne",
          onClick: () => layoutData.closeDialog(),
        },
      });
    } else {
      await getAndOpenEditForm(projectID, projectName);
    }
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
                onDelete={() => onDelete(project.id, project.name)}
                edit={() => onEdit(project.id, project.name)}
                onToggleVisibility={() =>
                  onToggleVisibility(project.id, project.name)
                }
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
            {projectsLoading
              ? "Načítám projekty..."
              : "Zatím neexistují žádné projekty."}
          </motion.p>
        )}
      </div>
    </AnimatePresence>
  );
};

export default AdminProjectList;
