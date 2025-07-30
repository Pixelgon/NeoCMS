'use client';
import { Header } from "@/components/header/Index";
import { AdminProjectList } from "@/components/layout/AdminProjectList";
import { Btn } from "@/components/layout/Btn";
import { ProjectModal } from "@/components/layout/ProjectModal";
import { Section } from "@/components/layout/Section";
import { Dialog } from "@/components/layout/Dialog";
import TagModal from "@/components/layout/TagModal";
import { LayoutContext } from "@/context/LayoutContext";
import ProjectType from "@/types/ProjectType";
import { useSession, signIn, signOut } from "next-auth/react";
import { useTopLoader } from "nextjs-toploader";
import { useContext, useEffect, useState } from "react";

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

const AdminPage = () => {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [project, setProject] = useState<ProjectType>(emptyProject);
  const [modal, setModal] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [tagModalModal, setTagModalModal] = useState(false);
  const layoutData = useContext(LayoutContext);
  const [loading, setLoading] = useState(true);
  const loader = useTopLoader();

  const openProjectModal = async(projectID?: string) => {
    loader.start();
    if(projectID) {
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
    loader.done();
    setModal(true);
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
          setModal(false);
          layoutData.showToast({ message: 'Projekt byl aktualizován', type: 'success' });
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
          setModal(false);
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

  useEffect(() => {
    if (status === "authenticated") {
      const load = async () => {
        loader.start();
        setLoading(true);
        const res = await fetch("/api/projects"); // Načteme všechny pro admin
        const data = await res.json();
        setProjects(data.projects || data); // Kompatibilita s novým/starým API
        loader.done();
        setLoading(false);
      };
      load();
    }
  }, [status]);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status === "authenticated") {
    return (
      <>
        <Header bg="/images/headers/projects-header.webp" title="Admin panel"/>
        <main>
          <Section isPrim>
            <div className="flex gap-3">
              <Btn onClick={() => openProjectModal() } prim>Vytvořit nový projekt</Btn>
              <Btn onClick={() => setTagModalModal(true)}>Upravit tagy</Btn>
              <Btn onClick={() => signOut({callbackUrl: "/", redirect: true})}>Odhlásit se</Btn>
            </div>
            <AdminProjectList 
              projects={projects} 
              openProjectModal={openProjectModal}
              loading={loading}
              onDeleteProject={openDeleteDialog}
              onToggleVisibility={toggleProjectVisibility}
            />
          </Section>
        </main>
        <ProjectModal 
          project={project} 
          setProject={setProject} 
          modalState={modal} 
          setModalState={setModal}
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
      </>
    );
  }
};

export default AdminPage;