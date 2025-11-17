"use client";
import { LayoutContext } from "@/context/layoutContext";
import { signOut, useSession } from "next-auth/react";
import { useTopLoader } from "nextjs-toploader";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { Btn } from "../layout/btn";
import { Dialog } from "../layout/dialog";
import { AdminLink } from "./adminPanelLink";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import ProjectType from "@/types/projectType";
import ProjectCardType from "@/types/projectCardType";

const emptyProject: ProjectType = {
  id: "",
  name: "",
  slug: "",
  body: "",
  description: "",
  background: "",
  photo: "",
  tags: [],
  visible: true,
};

export const AdminPanel: FC = () => {
  const { data: session } = useSession();
  const [projects, setProjects] = useState<ProjectCardType[]>([]);
  const [project, setProject] = useState<ProjectType>(emptyProject);
  const [projectModal, setProjectModal] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [tagModalModal, setTagModalModal] = useState(false);
  const [projectListModal, setProjectListModal] = useState(false);
  const layoutData = useContext(LayoutContext);
  const loader = useTopLoader();

  // Otevření modalu pro vytvoření/úpravu projektu
  const openProjectModal = async (projectID?: string) => {
    setProjectListModal(false);
    setProject(emptyProject);
    if (projectID) {
      loader.start();
      await fetch(`/api/projects/${projectID}`)
        .then((res) => res.json())
        .then((data) => {
          setProject(data);
        })
        .catch((error) => {
          layoutData.showToast({ message: error, type: "error" });
        });
    }
    setTimeout(() => {
      setProjectModal(true);
    }, 300);
    loader.done();
  };

  const handleProjectSubmit = async (projectData: ProjectType) => {
    loader.start();

    try {
      if (projectData.id) {
        // Aktualizace existujícího projektu
        const response = await fetch(`/api/projects/${projectData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...projectData,
          }),
        });

        if (response.ok) {
          const updatedProject = await response.json();
          setProjects((prev) =>
            prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
          );
          setProject(updatedProject);
          setProjectModal(false);
          setTimeout(() => {
            setProjectListModal(true);
            layoutData.showToast({
              message: "Projekt byl aktualizován",
              type: "success",
            });
            setProject(emptyProject);
          }, 300);
        } else {
          const resp = await response.json();
          layoutData.showToast({
            message: resp.error || "Chyba při aktualizaci",
            type: "error",
          });
        }
      } else {
        // Vytvoření nového projektu
        const response = await fetch("/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: projectData.name,
            body: projectData.body,
            description: projectData.description,
            background: projectData.background,
            photo: projectData.photo,
            slug: projectData.slug,
            tags: projectData.tags,
          }),
        });

        if (response.ok) {
          const newProject = await response.json();
          setProjects((prev) => [newProject, ...prev]);
          setProject(newProject);
          setProjectModal(false);
          layoutData.showToast({
            message: "Projekt byl vytvořen",
            type: "success",
          });
        } else {
          const resp = await response.json();
          layoutData.showToast({
            message: resp.error || "Chyba při vytváření projektu",
            type: "error",
          });
        }
      }
    } catch (error) {
      layoutData.showToast({
        message: "Chyba při ukládání projektu",
        type: "error",
      });
    } finally {
      loader.done();
    }
  };

  const openDeleteDialog = (projectId: string) => {
    setProjectToDelete(projectId);
    setDeleteDialog(true);
  };

  const handleDeleteConfirm = (confirm: boolean) => {
    if (confirm && projectToDelete) {
      deleteProject(projectToDelete);
    }
    setDeleteDialog(false);
    setProjectToDelete(null);
  };

  

  const deleteProject = async (projectId: string) => {
    try {
      loader.start();
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== projectId));
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

  return (
    <>
      <div
        className={
          "fixed w-full bottom-0 left-0 p-4 bg-navbar backdrop-blur-md flex gap-3 items-center justify-center flex-wrap z-[1002]"
        }
      >
        <AdminLink onClick={() => console.log("create")}>
          Vytvořit nový projekt
        </AdminLink>
        <AdminLink onClick={() => console.log("tag")}>
          Správa tagů
        </AdminLink>
        <AdminLink onClick={() => console.log("projectList")}>
          Správa projektů
        </AdminLink>
        <div className="flex items-center gap-3 md:ml-auto font-quicksand">
          <AdminLink
            onClick={() => signOut({ callbackUrl: "/", redirect: true })}
          >
            <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
          </AdminLink>
          <span className="text-base text-wh">
            Zdravíčko,{" "}
            <span className={"text-pxlgn font-semibold"}>
              {session?.user?.name}
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
