'use client';
import { LayoutContext } from "@/context/layoutContext";
import { signOut, useSession } from "next-auth/react";
import { useTopLoader } from "nextjs-toploader";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { Btn } from "../layout/btn";
import { Dialog } from "../layout/dialog";
import TagModal from "../tag/tagModal";
import { ProjectModal } from "../project/projectModal";
import { AdminLink } from "./adminPanelLink";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import AdminProjectList from "./adminProjectList";
import ProjectType from "@/types/projectType";


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
   const [projects, setProjects] = useState<ProjectType[]>([]);
   const [project, setProject] = useState<ProjectType>(emptyProject);
   const [projectModal, setProjectModal] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
   const [tagModalModal, setTagModalModal] = useState(false);
   const [projectListModal, setProjectListModal] = useState(false);
   const layoutData = useContext(LayoutContext);
   const loader = useTopLoader();

   const loadProjects = useCallback(async () => {
      try {
         loader.start();
         const response = await fetch('/api/projects');
         if (response.ok) {
            const data = await response.json();
            setProjects(data.projects);
         } else {
            layoutData.showToast({ message: 'Chyba při načítání projektů', type: 'error' });
         }
      } catch (error) {
         layoutData.showToast({ message: 'Chyba při načítání projektů', type: 'error' });
      } finally {
         loader.done();
      }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const openProjectModal = async(projectID?: string) => {
      if(projectID) {
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
      else {
        setProject(emptyProject);
      }
      setProjectListModal(false);
      // O.3s delay
      setTimeout(() => {
        setProjectModal(true);
      }, 300);
      loader.done();
  }

   const handleProjectSubmit = async (projectData: ProjectType, tags: any[]) => {
    loader.start();
    
    try {
      if (projectData.id) {
        // Aktualizace existujícího projektu
        const response = await fetch(`/api/projects/${projectData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...projectData,
            tags: tags.map(tag => tag.id),
          }),
        });
        
        if (response.ok) {
          const updatedProject = await response.json();
          setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
          setProject(updatedProject);
          setProjectModal(false);
          setTimeout(() => {
            setProjectListModal(true);
            layoutData.showToast({ message: 'Projekt byl aktualizován', type: 'success' });
          }, 300); 
        } else {
          layoutData.showToast({ message: 'Chyba při aktualizaci', type: 'error' });
        }
      } else {
        // Vytvoření nového projektu
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: projectData.name,
            body: projectData.body,
            description: projectData.description,
            background: projectData.background,
            photo: projectData.photo,
            slug: projectData.slug,
            tags: tags.map((tag) => tag.id)
          }),
        });
        
        if (response.ok) {
          const newProject = await response.json();
          setProjects(prev => [newProject, ...prev]);
          setProject(newProject);
          setProjectModal(false);
          layoutData.showToast({ message: 'Projekt byl vytvořen', type: 'success' });
        } else {
          layoutData.showToast({ message: 'Chyba při vytváření projektu', type: 'error' });
        }
      }
    } catch (error) {
      layoutData.showToast({ message: 'Chyba při ukládání projektu', type: 'error' });
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

  const toggleProjectVisibility = async (projectId: string) => {
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

  const deleteProject = async (projectId: string) => {
    try {
      loader.start();
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setProjects(prev => prev.filter(p => p.id !== projectId));
        layoutData.showToast({ message: 'Projekt byl smazán', type: 'success' });
      } else {
        layoutData.showToast({ message: 'Chyba při mazání projektu', type: 'error' });
      }
    } catch (error) {
      layoutData.showToast({ message: 'Chyba při mazání projektu', type: 'error' });
    } finally {
      loader.done();
    }
  };

  const openProjectListModal = async() => {
    // Pak načteme data na pozadí
    await loadProjects();
    // Nejdříve otevřeme modal
    setProjectListModal(true);
  }
   
  return (
    <>
      <div className={'fixed w-full bottom-0 left-0 p-4 bg-navbar backdrop-blur-md z-[98] flex gap-3 items-center justify-center flex-wrap'}>
        <AdminLink onClick={() => openProjectModal()}>Vytvořit nový projekt</AdminLink>
        <AdminLink onClick={() => setTagModalModal(true)}>Správa tagů</AdminLink>
        <AdminLink onClick={() => openProjectListModal()}>Správa projektů</AdminLink>
        <div className="flex items-center gap-3 md:ml-auto font-quicksand">
          <AdminLink onClick={() => signOut({ callbackUrl: "/", redirect: true })}>
            <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
          </AdminLink>
          <span className="text-base text-wh">Zdravíčko, <span className={'text-pxlgn font-semibold'}>{session?.user?.name}</span></span>
        </div>
     </div>
     <ProjectModal
           project={project}
           setProject={setProject}
           modalState={projectModal}
           setModalState={setProjectModal}
           onSubmit={handleProjectSubmit} 
      />
      <Dialog DialogState={deleteDialog}>
         <h4>Opravdu chcete smazat tento projekt?</h4>
         <div className={'flex flex-wrap gap-4 w-full'}>
            <Btn className={'flex-grow'} onClick={() => handleDeleteConfirm(true)} type="button" prim>Ano</Btn>
            <Btn className={'flex-grow'} onClick={() => handleDeleteConfirm(false)} type="button">Ne</Btn>
         </div>
      </Dialog>
      <TagModal
         modalState={tagModalModal}
         setModalState={setTagModalModal} 
      />
      <AdminProjectList 
          modalState={projectListModal}
          setModalState={setProjectListModal}
          onEdit={openProjectModal}
          onDelete={openDeleteDialog}
          onToggleVisibility={toggleProjectVisibility}
          projects={projects}
      />
   </>
  );
};

export default AdminPanel;